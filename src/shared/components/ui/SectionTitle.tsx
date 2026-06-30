import type { ReactNode } from "react";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  icon?: ReactNode;
};

export default function SectionTitle({ eyebrow, title, icon }: SectionTitleProps) {
  return (
    <div className="dashboard-section-title">
      <div>
        <span>{eyebrow}</span>
        <h3>{title}</h3>
      </div>
      {icon}
    </div>
  );
}
