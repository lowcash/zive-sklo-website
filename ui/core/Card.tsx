import { ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "sm" | "md" | "lg" | "xl";
  gap?: "xs" | "sm" | "md" | "lg";
  layout?: "default" | "column";
};

/**
 * Card shell primitive - semantic card container
 * NO BRAND STYLES - purely semantic container with basic variants
 */
export function Card({ children, variant = "default", padding = "lg", gap = "md", layout = "default" }: CardProps) {
  const variantClasses = {
    default: "bg-white bg-opacity-5",
    elevated: "bg-white bg-opacity-5 shadow-xl",
    outlined: "border border-border bg-transparent",
    glass: "bg-glass backdrop-blur-glass border border-glass",
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const gapClasses = {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const layoutClasses = {
    default: "",
    column: "flex flex-col",
  };

  const combinedClasses = `rounded-xl ${variantClasses[variant]} ${paddingClasses[padding]} ${layout === "column" ? `${layoutClasses[layout]} ${gapClasses[gap]}` : ""}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}
