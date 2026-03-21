import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

/**
 * Button primitive - interactive button component
 * NO BRAND STYLES - purely semantic interactive element
 * Note: This is a leaf component and can use 'use client' when needed
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-accent-amber text-surface-dark hover:bg-opacity-90",
    secondary: "bg-transparent border-2 border-accent-ice text-accent-ice hover:bg-accent-ice hover:text-surface-dark",
    ghost: "bg-transparent text-text-primary hover:bg-white hover:bg-opacity-10",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${disabledClasses}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
