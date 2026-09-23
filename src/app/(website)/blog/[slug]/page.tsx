import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody, extractToc } from "@/components/blog/ArticleBody";
import { ArticleFaq } from "@/components/blog/ArticleFaq";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogReveal } from "@/components/blog/BlogReveal";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLdScript } from "@/components/JsonLdScript";
import { breadcrumbSchema, faqPageSchema } from "@/lib/seo";
import {
  getAllPublishedPostSlugs,
  getPostBySlug,
  getPostBySlugForMetadata,
  getRelatedPosts,
} from "@/sanity/lib/api";
import { blogPostingSchema, buildPostMetadata } from "@/sanity/lib/blog-seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPublishedPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugForMetadata(slug);
  if (!post) {
    return { title: "Article not found", robots: { index: false, follow: false } };
  }
  return buildPostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post);
  const toc = extractToc(post.body);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const faqItems = (post.faq || []).filter(
    (item) => item.question?.trim() && item.answer?.trim()
  );

  return (
    <>
      <JsonLdScript data={blogPostingSchema(post)} />
      <JsonLdScript data={breadcrumbSchema(breadcrumbs)} />
      {faqItems.length ? (
        <JsonLdScript
          data={faqPageSchema(
            faqItems.map((item) => ({
              question: item.question,
              answer: item.answer,
            }))
          )}
        />
      ) : null}

      <Header />
      <main className="blog-page">
        <div className="blog-article-shell container">
          <Breadcrumbs items={breadcrumbs} />
          <article>
            <BlogReveal>
              <ArticleHeader post={post} />
            </BlogReveal>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
              <div>
                <ArticleBody value={post.body} />
                <ArticleFaq items={faqItems} />
              </div>
              <aside className="lg:pt-2">
                <div className="lg:sticky lg:top-28">
                  <TableOfContents items={toc} />
                </div>
              </aside>
            </div>

            <RelatedPosts posts={related} />
            <BlogCTA />
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
