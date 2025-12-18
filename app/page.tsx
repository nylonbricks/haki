import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { routes } from "~/constants/routes";
import { type ArticleItem, getArticleList } from "~/libs/articles";

const Page = async () => {
  const [thoughts, articles] = await Promise.all([
    getArticleList("thoughts"),
    getArticleList("articles"),
  ]);

  return (
    <>
      <p className="text-balance break-keep leading-relaxed">
        Begin with a single sentence that introduces who you are.
      </p>

      <p className="mt-8 text-balance break-keep leading-relaxed">
        Follow it with a short description of your hobbies and personal
        philosophy. Aim for at least three lines—if it’s too brief, readers may
        find it harder to get a sense of who you are.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
        <div className="flex flex-col gap-4">
          <Link
            className="w-fit font-semibold text-sm text-text-secondary"
            href={routes.crafts}
          >
            Craft
          </Link>
        </div>

        <ItemListSection
          getItemLink={(slug) => routes.thought(slug)}
          items={thoughts}
          sectionHref={routes.thoughts}
          title="Thoughts"
        />

        <ItemListSection
          getItemLink={(slug) => routes.article(slug)}
          items={articles}
          sectionHref={routes.articles}
          title="Articles"
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
