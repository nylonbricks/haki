import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
// @ts-expect-error
import { BlockMath, InlineMath } from "react-katex";
import { codeToHtml, createCssVariablesTheme } from "shiki";
import { twMerge } from "tailwind-merge";
import { LazyImage } from "~/components/ui/lazy-image";
import { ReplyLine } from "~/components/ui/reply-line";

const cssVariablesTheme = createCssVariablesTheme({});

export const components: Record<
  string,
  // biome-ignore lint/suspicious/noExplicitAny: MDX components props
  (props: any) => ReactNode | Promise<ReactNode>
> = {
  h1: (props) => (
    <h1
      className="mb-6 text-balance font-semibold text-text-secondary text-xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 mb-6 text-balance font-semibold text-lg text-text-secondary"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-12 mb-6 text-balance font-semibold text-text-secondary"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-6 flex list-outside list-disc flex-col gap-2 pl-5 marker:text-text-tertiary"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-6 flex list-outside list-decimal flex-col gap-2 pl-5 marker:text-text-tertiary"
      {...props}
    />
  ),
  li: (props) => (
    <li
      className="pl-1 font-normal text-md leading-relaxed [&_ol]:mt-2 [&_ul]:mt-2"
      {...props}
    />
  ),
  a: ({ href, ...props }) => (
    <Link
      className={twMerge(
        "break-keep underline decoration-from-font decoration-text-tertiary underline-offset-3 transition-colors duration-150",
        "outline-offset-2 hover:decoration-text-primary",
        href?.startsWith("https://") && "external-link"
      )}
      draggable={false}
      href={href}
      {...(href?.startsWith("https://")
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-md" {...props} />,
  p: (props) => <p className="mt-6 font-normal text-md" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="-ml-6 pl-6 sm:-ml-10 sm:pl-10 md:-ml-14 md:pl-14"
      {...props}
    />
  ),
  pre: (props) => (
    <pre className="mt-6 whitespace-pre md:whitespace-pre-wrap" {...props} />
  ),
  code: async (props) => {
    if (typeof props.children === "string") {
      const code = codeToHtml(props.children, {
        lang: "jsx",
        theme: cssVariablesTheme,
        transformers: [
          {
            pre: (hast) => {
              if (hast.children.length !== 1) {
                throw new Error("<pre>: Expected a single <code> child");
              }
              if (hast.children[0]?.type !== "element") {
                throw new Error("<pre>: Expected a <code> child");
              }
              return hast.children[0];
            },
            postprocess(html) {
              return html.replace(/^<code>|<\/code>$/g, "");
            },
          },
        ],
      });

      return (
        <code
          className="shiki css-variables inline text-xs md:text-[13px]"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: required to render the highlighted code.
          dangerouslySetInnerHTML={{ __html: await code }}
        />
      );
    }

    return <code className="inline" {...props} />;
  },
  Image,
  img: async ({ src, alt }) => {
    let img: ReactNode;

    if (src.startsWith("https://")) {
      img = (
        <LazyImage
          alt={alt}
          className="h-auto max-w-full"
          draggable={false}
          src={src}
        />
      );
    } else {
      try {
        const image = await import(`./assets/images/${src}`);

        img = (
          <Image
            alt={alt}
            draggable={false}
            placeholder="blur"
            quality={95}
            src={image.default}
          />
        );
      } catch (error) {
        console.error(error);
        img = <p>Image Loading Error (src: {src})</p>;
      }
    }

    return img;
  },
  hr: (props) => (
    <hr className="mx-auto my-12 w-24 border-divider" {...props} />
  ),
  InlineMath,
  BlockMath,

  ReplyLine,
};

export function useMDXComponents(inherited: MDXComponents): MDXComponents {
  return {
    ...inherited,
    ...components,
  };
}
