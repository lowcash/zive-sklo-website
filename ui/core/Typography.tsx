import { ReactNode, createElement } from "react";

export type TextProps = {
  children: ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary";
  align?: "left" | "center" | "right";
  leading?: "tight" | "normal" | "relaxed";
  as?: "p" | "span" | "div";
};

/**
 * Text primitive - semantic text component
 * NO BRAND STYLES - purely semantic typography
 */
export function Text({
  children,
  size = "base",
  weight = "normal",
  color = "primary",
  align = "left",
  leading = "normal",
  as: Component = "p",
}: TextProps) {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const leadingClasses = {
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
  };

  return (
    <Component
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${colorClasses[color]} ${alignClasses[align]} ${leadingClasses[leading]}`}
    >
      {children}
    </Component>
  );
}

export type HeadingProps = {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary";
  align?: "left" | "center" | "right";
  leading?: "tight" | "normal" | "relaxed";
};

/**
 * Heading primitive - semantic heading component
 * NO BRAND STYLES - purely semantic typography
 */
export function Heading({
  children,
  level,
  size,
  weight = "bold",
  color = "primary",
  align = "left",
  leading = "normal",
}: HeadingProps) {
  // Default sizes based on level if not specified
  const defaultSizes: Record<number, "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"> = {
    1: "5xl",
    2: "4xl",
    3: "3xl",
    4: "2xl",
    5: "xl",
    6: "lg",
  };

  const effectiveSize = size || defaultSizes[level];

  const sizeClasses: Record<string, string> = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    primary: "text-text-primary",
    secondary: "text-text-secondary",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const leadingClasses = {
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
  };

  return createElement(
    `h${level}`,
    {
      className: `font-display ${sizeClasses[effectiveSize]} ${weightClasses[weight]} ${colorClasses[color]} ${alignClasses[align]} ${leadingClasses[leading]}`,
    },
    children
  );
}
