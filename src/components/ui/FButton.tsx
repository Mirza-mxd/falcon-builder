import { forwardRef } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useLocalePath } from "@/lib/i18n";

const variantStyles = {
  primary: "bg-primary-500 text-white hover:bg-primary-400 active:bg-primary-600",
  cta: "bg-cta text-white hover:bg-cta-hover active:brightness-90",
  outline:
    "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
  ghost: "bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100",
  "dark-outline":
    "border-2 border-white text-white hover:bg-white/10 active:bg-white/20",
} as const;

const sizeStyles = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: () => void;
};

export type FButtonProps = ButtonAsButton | ButtonAsLink;

const FButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, FButtonProps>(
  function FButton(props, ref) {
    const { variant = "primary", size = "md", className, children, ...rest } = props;
    const localePath = useLocalePath();

    const classes = cn(
      "inline-flex items-center justify-center gap-2 font-semibold",
      "rounded-[var(--radius-button)] transition-all duration-200",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
      "disabled:pointer-events-none disabled:opacity-50",
      "cursor-pointer select-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ("href" in rest && rest.href !== undefined) {
      const { href, onClick } = rest as ButtonAsLink;
      const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            onClick={onClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      const [pathOnly, queryString] = href.split("?");
      const search = queryString
        ? Object.fromEntries(new URLSearchParams(queryString))
        : undefined;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={localePath(pathOnly)}
          search={search as never}
          className={classes}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }

    const buttonRest = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...buttonRest}
      >
        {children}
      </button>
    );
  }
);

export default FButton;
