import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-sm text-[var(--muted-dim)]">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-[var(--muted-dim)]">
                  /
                </span>
              ) : null}
              {current ? (
                <span aria-current="page" className="text-[var(--foreground)]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-[var(--muted)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
