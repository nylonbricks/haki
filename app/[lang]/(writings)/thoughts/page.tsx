import { routes } from "~/constants/routes";
import { getArticleList } from "~/libs/articles";
import { ArticleList } from "../_components/article-list";

const route = routes.thoughts;

import type { Locale } from "~/i18n-config";

const Page = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  const items = await getArticleList(route, lang);

  return <ArticleList items={items} lang={lang} route={route} />;
};

export default Page;
