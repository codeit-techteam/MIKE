import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type SharedProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
};

type CTAButtonProps =
  | (SharedProps &
      ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: undefined;
      })
  | (SharedProps &
      AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
      });

const variants: Record<NonNullable<SharedProps["variant"]>, { className: string; style: CSSProperties }> = {
  primary: {
    className: "hover:brightness-95",
    style: { backgroundColor: "#F5F5F2", color: "#050505" },
  },
  secondary: {
    className: "border border-[rgba(255,255,255,0.14)] bg-transparent hover:border-[#F5F5F2] hover:bg-[#151515]",
    style: { color: "#F5F5F2" },
  },
  ghost: {
    className: "bg-transparent underline-offset-4 hover:underline",
    style: { color: "#A0A0A0" },
  },
};

export function CTAButton({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: CTAButtonProps) {
  const preset = variants[variant];
  const classes = [
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-[filter,background-color,border-color,color] duration-300",
    preset.className,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        style={preset.style}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      style={preset.style}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
