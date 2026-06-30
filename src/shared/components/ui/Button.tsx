import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "icon";
};

export default function Button({ children, className = "", variant = "default", ...props }: ButtonProps) {
  const classes = ["ui-button", variant === "icon" ? "ui-button-icon" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
