import { promises as fs } from "node:fs";
import path from "node:path";

const MDX_EXTENSION_REGEX = /\.mdx$/;

export interface ArticleItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  sort: number;
}

export async function getArticleList(_route: string) {
  const route = _route.replace(/^\/+/g, "");
  const directory = path.join(
    process.cwd(),
    "app",
    "(writings)",
    route,
    "_articles"
  );

  const articles = await fs.readdir(directory);

  const items: ArticleItem[] = [];
  for (const article of articles) {
    if (!article.endsWith(".mdx")) {
      continue;
    }
    const module = await import(
      `~/app/(writings)/${route}/_articles/${article}`
    );

    if (!module.metadata) {
      throw new Error(`Missing \`metadata\` in ${article}`);
    }

    items.push({
      slug: article.replace(MDX_EXTENSION_REGEX, ""),
      title: module.metadata.title,
      description: module.metadata.description,
      date: module.metadata.date || "-",
      sort: Number(module.metadata.date?.replaceAll(".", "") || 0),
    });
  }
  items.sort((a, b) => b.sort - a.sort);

  return items;
}
