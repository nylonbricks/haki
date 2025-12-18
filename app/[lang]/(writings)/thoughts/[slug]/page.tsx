import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes } from "~/constants/routes";
import { ArticleDetail } from "../../_components/article-detail";
import { generateArticleMetadata } from "../../_utils/generate-metadata";
import { generateArticleStaticParams } from "../../_utils/generate-static-params";

import type { Locale } from "../../../../../i18n-config";

type PageProps = {
  params: Promise<{ slug: string; lang: Locale }>;
};

const Page = async ({ params }: PageProps) => {
  const { slug, lang } = await params;

  try {
    const { default: MDXContent, metadata } = await import(
      `../_articles/${slug}.${lang}.mdx`
    );
    return <ArticleDetail MDXContent={MDXContent} metadata={metadata} />;
  } catch {
    notFound();
  }
};

export default Page;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug, lang } = await params;
  try {
    const { metadata } = await import(`../_articles/${slug}.${lang}.mdx`);
    return generateArticleMetadata(metadata, slug, routes.thoughts);
  } catch {
    return {};
  }
};

export const generateStaticParams = async () =>
  generateArticleStaticParams(routes.thoughts);
