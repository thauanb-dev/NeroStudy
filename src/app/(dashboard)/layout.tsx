import type { ReactNode } from "react";
import Sidebar from "../../shared/components/Sidebar";
import "../../styles/NeroStudyStyle.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}
