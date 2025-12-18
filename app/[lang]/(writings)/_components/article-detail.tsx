import type { ComponentType } from "react";
import { Giscus } from "~/components/ui/giscus";

type ArticleMetadata = {
  title: string;
  description: string;
  date: string;
  comments?: boolean;
};

type ArticleDetailProps = {
  MDXContent: ComponentType;
  metadata: ArticleMetadata;
  showDivider?: boolean;
};

export const ArticleDetail = ({
  MDXContent,
  metadata,
  showDivider = true,
}: ArticleDetailProps) => (
  <>
    <article>
      <header className="flex flex-col gap-0.5">
        <h1 className="break-keep font-semibold text-lg text-text-primary leading-relaxed">
          {metadata.title}
        </h1>
        <p className="break-keep font-medium text-sm text-text-secondary leading-relaxed">
          {metadata.description}
        </p>
        <time className="mt-1 break-keep font-medium text-text-secondary text-xs">
          {metadata.date}
        </time>
      </header>
      {showDivider ? (
        <hr className="mx-auto my-12 w-24 border-divider" />
      ) : null}
      <MDXContent />
    </article>

    {metadata.comments ? <Giscus /> : null}
  </>
);
