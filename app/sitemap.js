import { categories, products } from "../data/catalog";
import { SITE_URL } from "../data/site";

export default function sitemap() {
  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/productos", priority: 0.9 },
    { path: "/nosotros", priority: 0.6 },
    { path: "/contacto", priority: 0.6 },
  ];

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: new URL(path, SITE_URL).toString(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority,
    })),
    ...categories.map((category) => ({
      url: new URL(`/${category.slug}`, SITE_URL).toString(),
      changeFrequency: "monthly",
      priority: 0.8,
      images: [new URL(category.image, SITE_URL).toString()],
    })),
    ...products.map((product) => ({
      url: new URL(`/producto/${product.slug}`, SITE_URL).toString(),
      changeFrequency: "monthly",
      priority: 0.7,
      images: [new URL(product.image, SITE_URL).toString()],
    })),
  ];
}
