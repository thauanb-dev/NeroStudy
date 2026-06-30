import type { ReactNode } from "react";
import AppHeader from "../../shared/components/AppHeader";
import Sidebar from "../../shared/components/Sidebar";
import "../../styles/NeroStudyStyle.css";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="workspace">
        <AppHeader />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
