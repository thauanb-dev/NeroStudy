"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/pomodoro", label: "Pomodoro" },
  { href: "/gestor-estudos", label: "Gestor de Estudo" },
  { href: "/planejamento", label: "Planejamento" },
  { href: "/metas", label: "Metas do Dia" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">N</div>

        <div>
          <h1>NeroStudy</h1>
          <p>Foco e constância</p>
        </div>
      </div>

      <nav className="nav">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-button ${pathname === item.href ? "active" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <strong>NeroStudy</strong>
        <p>Um painel limpo para estudar com constância, foco e controle.</p>
      </div>
    </aside>
  );
}
