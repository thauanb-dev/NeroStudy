import type { ReactNode } from "react";
import Card from "./Card";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
};

export default function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="dashboard-stat-card">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </Card>
  );
}
