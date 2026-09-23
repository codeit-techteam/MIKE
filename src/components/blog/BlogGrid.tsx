import { BlogCard } from "@/components/blog/BlogCard";
import { BlogReveal } from "@/components/blog/BlogReveal";
import type { PostCard } from "@/sanity/lib/types";

export function BlogGrid({
  posts,
  title = "Latest",
}: {
  posts: PostCard[];
  title?: string;
}) {
  if (!posts.length) return null;

  return (
    <section className="py-14" aria-labelledby="blog-latest-heading">
      <h2
        id="blog-latest-heading"
        className="eyebrow mb-10 text-[var(--muted-dim)]"
      >
        {title}
      </h2>
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogReveal key={post._id}>
            <BlogCard post={post} />
          </BlogReveal>
        ))}
      </div>
    </section>
  );
}
