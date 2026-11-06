const defaultSocialImage = "/images/brand/logo-atomix.png";

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
}) {
  const fullTitle = `${title} | Atomix Solutions`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Atomix Solutions",
      locale: "es_MX",
      type: "website",
      images: [
        {
          url: image,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
