import { routes } from "~/constants/routes";
import { getArticleList } from "~/libs/articles";
import { ArticleList } from "../_components/article-list";

const route = routes.articles;

const Page = async () => {
  const items = await getArticleList(route);

  return <ArticleList items={items} route={route} />;
};

export default Page;
