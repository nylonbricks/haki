import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routes } from "~/constants/routes";
import { ArticleDetail } from "../../_components/article-detail";
import { generateArticleMetadata } from "../../_utils/generate-metadata";
import { generateArticleStaticParams } from "../../_utils/generate-static-params";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  try {
    const { default: MDXContent, metadata } = await import(
      `../_articles/${slug}.mdx`
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
  const { slug } = await params;
  try {
    const { metadata } = await import(`../_articles/${slug}.mdx`);
    return generateArticleMetadata(metadata, slug, routes.thoughts);
  } catch {
    return {};
  }
};

export const generateStaticParams = async () =>
  generateArticleStaticParams(routes.thoughts);
