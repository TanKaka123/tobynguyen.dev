import React from "react";
import Head from "next/head";

const siteTitle = "Ant Engineer";
const siteDescription =
  "I solve problems using software and write bite-sized articles for developers.";
const author = "Ant Engineer";
const siteUrl = "https://tobynguyen.dev";
const siteImage = "/preview.jpg";

type Props = {
  description?: string;
  keywords?: string[];
  schema?: { [key: string]: any };
  title?: string;
  url?: string;
  image?: string;
};

export default function SEO({
  description,
  keywords = ["toby", "nguyen", "dev", "blog", "tobynguyen", "personal site"],
  schema,
  title,
  url,
  image,
}: Props) {
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaUrl = url || siteUrl;
  const metaImage = image || `${siteUrl}${siteImage}`;

  const defaultSchema = {
    "@context": "http://schema.org",
    "@type": "Website",
    url: metaUrl,
    name: metaTitle,
    description: metaDescription,
    author: {
      "@type": "Person",
      name: author,
      url: siteUrl,
    },
    creator: [author],
    publisher: {
      "@type": "Person",
      name: author,
      url: siteUrl,
    },
    image: metaImage,
    mainEntityOfPage: metaUrl,
  };

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content={author} />
      <meta name="keywords" content={keywords.join(", ")} />

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema || defaultSchema),
        }}
      />
    </Head>
  );
}
