import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { routes } from "~/constants/routes";
import { type ArticleItem, getArticleList } from "~/libs/articles";
import { getDictionary } from "./dictionaries";
import { type Locale, i18n } from "../../i18n-config";

type PageProps = {
  params: Promise<{ lang: Locale }>;
};

const Page = async ({ params }: PageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const [thoughts, articles] = await Promise.all([
    getArticleList("thoughts", lang),
    getArticleList("articles", lang),
  ]);

  return (
    <>
      <p className="text-balance break-keep leading-relaxed">
        {dict.home.intro}
      </p>

      <p className="mt-8 text-balance break-keep leading-relaxed">
        {dict.home.description}
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
        <div className="flex flex-col gap-4">
          <Link
            className="w-fit font-semibold text-sm text-text-secondary"
            href={
              lang === i18n.defaultLocale
                ? routes.crafts
                : `/${lang}${routes.crafts}`
            }
          >
            {dict.home.sections.crafts}
          </Link>
        </div>

        <ItemListSection
          getItemLink={(slug) => 
            lang === i18n.defaultLocale
              ? routes.thought(slug)
              : `/${lang}${routes.thought(slug)}`
          }
          items={thoughts}
          sectionHref={
            lang === i18n.defaultLocale
              ? routes.thoughts
              : `/${lang}${routes.thoughts}`
          }
          title={dict.home.sections.thoughts}
        />

        <ItemListSection
          getItemLink={(slug) => 
            lang === i18n.defaultLocale
              ? routes.article(slug)
              : `/${lang}${routes.article(slug)}`
          }
          items={articles}
          sectionHref={
            lang === i18n.defaultLocale
              ? routes.articles
              : `/${lang}${routes.articles}`
          }
          title={dict.home.sections.articles}
        />
      </div>
    </>
  );
};

export default Page;

type ItemListSectionProps = {
  title: string;
  sectionHref: string;
  items: ArticleItem[];
  getItemLink: (slug: string) => string;
};

const ItemListSection = ({
  title,
  sectionHref,
  items,
  getItemLink,
}: ItemListSectionProps) => (
  <div className="flex flex-col gap-4">
    <Link
      className="w-fit font-semibold text-sm text-text-secondary"
      href={sectionHref}
    >
      {title}
    </Link>
    {items.slice(0, 3).map((item) => (
      <div key={item.slug}>
        <Link
          className={twMerge(
            "break-keep font-semibold text-text-primary underline decoration-from-font decoration-text-tertiary underline-offset-3 transition-colors duration-150",
            "outline-offset-2 hover:decoration-text-primary"
          )}
          href={getItemLink(item.slug)}
        >
          {item.title}
        </Link>
        <p className="mt-1 font-medium text-[13px] text-text-secondary">
          {item.description}
        </p>
      </div>
    ))}
  </div>
);
