import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLdScript } from "@/components/JsonLdScript";
import { SITE } from "@/lib/constants";
import {
  absoluteUrl,
  breadcrumbSchema,
  createPageMetadata,
  PAGES,
  webPageSchema,
} from "@/lib/seo";
import { getFeaturedPost, getPublishedPosts } from "@/sanity/lib/api";

const blogMeta = createPageMetadata(PAGES.blog);

export const metadata = {
  ...blogMeta,
  alternates: {
    ...blogMeta.alternates,
    types: {
      "application/rss+xml": absoluteUrl("/blog/rss.xml"),
    },
  },
};

export default async function BlogIndexPage() {
  const [posts, featured] = await Promise.all([
    getPublishedPosts(),
    getFeaturedPost(),
  ]);

  const featuredPost = featured || posts[0] || null;
  const latest = featuredPost
    ? posts.filter((post) => post._id !== featuredPost._id)
    : posts;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <JsonLdScript data={webPageSchema(PAGES.blog)} />
      <JsonLdScript data={breadcrumbSchema(breadcrumbs)} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: `${SITE.name} Blog`,
          url: absoluteUrl("/blog"),
          description: PAGES.blog.description,
          publisher: {
            "@type": "Organization",
            name: SITE.company,
            url: SITE.url,
          },
        }}
      />
      <Header />
      <main className="blog-page">
        <div className="blog-shell container">
          <BlogHero />
          {featuredPost ? <FeaturedPost post={featuredPost} /> : null}
          {latest.length ? <BlogGrid posts={latest} /> : null}
          {!posts.length ? (
            <section className="py-16">
              <p className="max-w-[36rem] text-[1.1rem] leading-relaxed text-[var(--muted)]">
                New writing from Mike AI will appear here. The CMS is ready —
                publish a post in Sanity Studio to make it live.
              </p>
            </section>
          ) : null}
          <BlogCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
