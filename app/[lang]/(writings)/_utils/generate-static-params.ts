import { promises as fs } from "node:fs";
import path from "node:path";

import { i18n } from "~/i18n-config";

export async function generateArticleStaticParams(_route: string) {
  const route = _route.replace(/^\/+/g, "");

  const articles = await fs.readdir(
    path.join(process.cwd(), "app", "[lang]", "(writings)", route, "_articles")
  );

  const params: { lang: string; slug: string }[] = [];

  for (const locale of i18n.locales) {
    const suffix = `.${locale}.mdx`;
    const localeArticles = articles.filter((name) => name.endsWith(suffix));

    for (const name of localeArticles) {
      params.push({
        lang: locale,
        slug: name.replace(suffix, ""),
      });
    }
  }

  return params;
}
