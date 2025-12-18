import { promises as fs } from "node:fs";
import path from "node:path";

export type ArticleItem = {
  slug: string;
  title: string;
  description: string;
  date: string;
  sort: number;
};

export async function getArticleList(_route: string, locale = "en") {
  const route = _route.replace(/^\/+/g, "");
  const directory = path.join(
    process.cwd(),
    "app",
    "[lang]",
    "(writings)",
    route,
    "_articles"
  );

  const articles = await fs.readdir(directory);

  const items: ArticleItem[] = [];
  const suffix = `.${locale}.mdx`;

  for (const article of articles) {
    if (!article.endsWith(suffix)) {
      continue;
    }
    const module = await import(
      `~/app/[lang]/(writings)/${route}/_articles/${article}`
    );

    if (!module.metadata) {
      throw new Error(`Missing \`metadata\` in ${article}`);
    }

    items.push({
      slug: article.replace(suffix, ""),
      title: module.metadata.title,
      description: module.metadata.description,
      date: module.metadata.date || "-",
      sort: Number(module.metadata.date?.replaceAll(".", "") || 0),
    });
  }
  items.sort((a, b) => b.sort - a.sort);

  return items;
}
