"use client";

import { CalendarDays, Crosshair, Flame, LayoutDashboard, ListChecks, MonitorCog } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: MonitorCog },
  { href: "/pomodoro", label: "Pomodoro", icon: Crosshair },
  { href: "/gestor-estudos", label: "Gestor de Estudo", icon: LayoutDashboard },
  { href: "/planejamento", label: "Planejamento", icon: CalendarDays },
  { href: "/metas", label: "Metas do Dia", icon: ListChecks },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link className="brand" href="/pomodoro">
        <div className="brand-icon">N</div>

        <div>
          <h1>NeroStudy</h1>
          <p>Foco e constância</p>
        </div>
      </Link>

      <nav className="nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-button ${pathname === item.href ? "active" : ""}`}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span className="sidebar-footer-icon" aria-hidden="true">
          <Flame size={16} />
        </span>
        <div>
          <strong>Sistema ativo</strong>
          <p>Rotina limpa para foco, estudo e constância.</p>
        </div>
      </div>
    </aside>
  );
}
