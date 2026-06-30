import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "article" | "section" | "div";
};

export default function Card({ as: Component = "article", children, className = "", ...props }: CardProps) {
  return (
    <Component className={`ui-card ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
