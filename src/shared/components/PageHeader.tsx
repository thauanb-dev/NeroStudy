type PageHeaderProps = {
  title: string;
  subtitle: string;
  todayFocus: number;
};

export default function PageHeader({ title, subtitle, todayFocus }: PageHeaderProps) {
  return (
    <header className="header">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="status-card">
        <span>Foco registrado hoje</span>
        <strong>{todayFocus}min</strong>
      </div>
    </header>
  );
}
