import type { FocusItem } from "../../../shared/hooks/useTodayFocus";

export default function FocusHistory({ items }: { items: FocusItem[] }) {
  return (
    <div className="card">
      <h3 className="card-title">Histórico de foco</h3>
      <div className="history-list">
        {items.length === 0 ? (
          <div className="empty">Nenhum foco registrado hoje.</div>
        ) : (
          items.map((item) => (
            <div className="history-item" key={item.id}>
              <strong>{item.label || "Sessão de foco"}</strong>
              <span>
                {item.minutes}min • {item.startedAt && item.endedAt
                  ? `${item.startedAt} até ${item.endedAt}`
                  : `concluído às ${item.createdAt}`}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
