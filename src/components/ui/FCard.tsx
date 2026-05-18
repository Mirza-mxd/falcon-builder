import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-white text-text-primary",
  dark: "bg-dark-lighter text-white",
} as const;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles;
}

const FCard = forwardRef<HTMLDivElement, CardProps>(function FCard(
  { variant = "default", className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-card)] p-6 sm:p-8",
        "shadow-card transition-all duration-300",
        "hover:shadow-card-hover hover:-translate-y-1",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export default FCard;
