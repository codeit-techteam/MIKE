import { BlogCard } from "@/components/blog/BlogCard";
import { BlogReveal } from "@/components/blog/BlogReveal";
import type { PostCard } from "@/sanity/lib/types";

export function RelatedPosts({ posts }: { posts: PostCard[] }) {
  if (!posts.length) return null;

  return (
    <section
      className="mt-20 border-t border-[var(--border-subtle)] pt-12"
      aria-labelledby="related-posts-heading"
    >
      <h2 id="related-posts-heading" className="eyebrow mb-10">
        Keep reading
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        {posts.map((post) => (
          <BlogReveal key={post._id}>
            <BlogCard post={post} />
          </BlogReveal>
        ))}
      </div>
    </section>
  );
}
