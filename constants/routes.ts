export const routes = {
  home: "/",
  crafts: "/crafts",

  thought: (slug: string) => `/thoughts/${slug}`,
  thoughts: "/thoughts",

  article: (slug: string) => `/articles/${slug}`,
  articles: "/articles",
};
