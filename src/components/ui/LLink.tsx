import { forwardRef } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { useLocalePath } from "@/lib/i18n";

/** Locale-aware Link: pass `href` like "/about" and it routes to /ar/about when needed */
type LLinkProps = Omit<LinkProps, "to"> & {
  href: string;
  children?: React.ReactNode;
  className?: string;
};

const LLink = forwardRef<HTMLAnchorElement, LLinkProps>(function LLink(
  { href, children, ...rest },
  ref
) {
  const localePath = useLocalePath();
  return (
    <Link ref={ref} to={localePath(href)} {...rest}>
      {children}
    </Link>
  );
});

export default LLink;
