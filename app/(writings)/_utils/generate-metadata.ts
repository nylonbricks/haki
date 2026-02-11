import type { Metadata } from "next";
import { variables } from "~/constants/variables";

interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
}

export function generateArticleMetadata(
  metadata: ArticleMetadata,
  slug: string,
  route: string
): Metadata {
  return {
    title: `${metadata.title} — ${variables.siteName}`,
    description: metadata.description,
    openGraph: {
      title: `${metadata.title} — ${variables.siteName}`,
      description: metadata.description,
      url: `${variables.siteUrl}/${route}/${slug}`,
      type: "article",
      publishedTime: metadata.date,
      images: [
        { url: variables.preview_image, alt: variables.preview_image_alt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.title} — ${variables.siteName}`,
      description: metadata.description,
      images: [
        { url: variables.preview_image, alt: variables.preview_image_alt },
      ],
      creator: variables.social.twitter,
    },
  };
}
