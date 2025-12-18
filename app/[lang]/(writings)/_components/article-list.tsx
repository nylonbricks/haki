import Link from "next/link";
import { twMerge } from "tailwind-merge";
import type { ArticleItem } from "~/libs/articles";
import { type Locale, i18n } from "~/i18n-config";

type ArticleListProps = {
  items: ArticleItem[];
  route: string;
  lang: Locale;
};

export const ArticleList = ({ items, route, lang }: ArticleListProps) => (
  <ul>
    {items.map((item) => (
      <li key={item.slug}>
        <Link
          className={twMerge(
            "group -mx-2 flex items-center justify-between rounded-sm px-2 py-1",
            "hover:bg-menu-background"
          )}
          draggable={false}
          href={
            lang === i18n.defaultLocale
              ? `${route}/${item.slug}`
              : `/${lang}${route}/${item.slug}`
          }
        >
          <span
            className={twMerge(
              "block font-medium text-md text-text-secondary",
              "group-hover:text-text-primary"
            )}
          >
            {item.title}
          </span>
          <time
            className={twMerge(
              "font-normal text-base text-text-tertiary tabular-nums leading-none tracking-tighter transition-colors",
              "group-hover:text-text-secondary group-hover:transition-none"
            )}
          >
            {item.date}
          </time>
        </Link>
      </li>
    ))}
  </ul>
);
