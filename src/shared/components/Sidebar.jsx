export default function Sidebar() {
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
        <button className="nav-button active" type="button">
          Pomodoro
        </button>

        <button className="nav-button" type="button">
          Gestor de Estudo
        </button>

        <button className="nav-button" type="button">
          Planejamento
        </button>

        <button className="nav-button" type="button">
          Metas do Dia
        </button>
      </nav>

      <div className="sidebar-footer">
        <strong>NeroStudy</strong>
        <p>Um painel limpo para estudar com constância, foco e controle.</p>
      </div>
    </aside>
  );
}