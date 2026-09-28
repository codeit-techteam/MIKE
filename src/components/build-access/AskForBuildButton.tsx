"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { CTAButton } from "@/components/CTAButton";
import { useBuildAccess } from "@/components/build-access/BuildAccessProvider";

type AskForBuildButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type" | "children">;

export function AskForBuildButton({
  children = "Join as Beta Tester",
  className,
  variant = "primary",
  onClick,
  ...props
}: AskForBuildButtonProps) {
  const { openBuildAccess } = useBuildAccess();

  return (
    <CTAButton
      type="button"
      variant={variant}
      className={className}
      onClick={() => {
        onClick?.();
        openBuildAccess();
      }}
      {...props}
    >
      {children}
    </CTAButton>
  );
}

type AskForBuildLinkProps = {
  children?: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "children">;

/** Text-style control that opens the build modal (footer, inline links). */
export function AskForBuildLink({
  children = "Join as Beta Tester",
  className,
  ...props
}: AskForBuildLinkProps) {
  const { openBuildAccess } = useBuildAccess();

  return (
    <a
      href="#access"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        openBuildAccess();
      }}
      {...props}
    >
      {children}
    </a>
  );
}
