import { ReactNode } from "react";

export type SectionProps = {
  children: ReactNode;
  id?: string;
  "aria-labelledby"?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
  surface?: "none" | "subtle";
};

/**
 * Section shell primitive - semantic section wrapper
 * NO BRAND STYLES - purely semantic layout wrapper
 */
export function Section({
  children,
  id,
  "aria-labelledby": ariaLabelledBy,
  spacing = "lg",
  surface = "none",
}: SectionProps) {
  const spacingClasses = {
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-24",
    xl: "py-24 sm:py-32",
  };

  const surfaceClasses = {
    none: "",
    subtle: "bg-white/5",
  };

  return (
    <section id={id} aria-labelledby={ariaLabelledBy} className={`${spacingClasses[spacing]} ${surfaceClasses[surface]}`}>
      {children}
    </section>
  );
}
