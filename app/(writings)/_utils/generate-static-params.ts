import { promises as fs } from "node:fs";
import path from "node:path";

const MDX_EXTENSION_REGEX = /\.mdx$/;

export async function generateArticleStaticParams(_route: string) {
  const route = _route.replace(/^\/+/g, "");

  const articles = await fs.readdir(
    path.join(process.cwd(), "app", "(writings)", route, "_articles")
  );

  return articles
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => ({ slug: name.replace(MDX_EXTENSION_REGEX, "") }));
}
