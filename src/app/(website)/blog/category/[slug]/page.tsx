import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLdScript } from "@/components/JsonLdScript";
import { SITE } from "@/lib/constants";
import {
  absoluteUrl,
  breadcrumbSchema,
  createPageMetadata,
} from "@/lib/seo";
import {
  getCategoriesWithPosts,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/sanity/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategoriesWithPosts();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: "Category not found", robots: { index: false, follow: false } };
  }

  const title = category.seoTitle || `${category.title} — ${SITE.name} Blog`;
  const description =
    category.seoDescription ||
    category.description ||
    `Articles in ${category.title} from Mike AI.`;

  return createPageMetadata({
    path: `/blog/category/${category.slug}`,
    title,
    description,
    lastModified: new Date().toISOString().slice(0, 10),
    summary: description,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategory(slug),
  ]);

  if (!category || !posts.length) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.title, path: `/blog/category/${category.slug}` },
  ];

  return (
    <>
      <JsonLdScript data={breadcrumbSchema(breadcrumbs)} />
      <JsonLdScript
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.title,
          url: absoluteUrl(`/blog/category/${category.slug}`),
          description: category.description || undefined,
          isPartOf: {
            "@type": "Blog",
            name: `${SITE.name} Blog`,
            url: absoluteUrl("/blog"),
          },
        }}
      />
      <Header />
      <main className="blog-page">
        <div className="blog-shell container">
          <header className="border-b border-[var(--border-subtle)] pb-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="eyebrow">Category</p>
            <h1 className="display mt-2 text-[clamp(2.6rem,7vw,4.5rem)] tracking-tight">
              {category.title}
            </h1>
            {category.description ? (
              <p className="mt-5 max-w-[40rem] text-[1.1rem] leading-relaxed text-[var(--muted)]">
                {category.description}
              </p>
            ) : null}
          </header>
          <BlogGrid posts={posts} title="Articles" />
          <BlogCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
