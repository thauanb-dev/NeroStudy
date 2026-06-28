import type { FocusItem } from "../../../shared/hooks/useTodayFocus";
import { Clock3, Trash2 } from "lucide-react";

type FocusHistoryProps = {
  items: FocusItem[];
  onDelete: (id: string) => void;
};

export default function FocusHistory({ items, onDelete }: FocusHistoryProps) {
  return (
    <div className="card focus-history-card">
      <div className="focus-card-heading">
        <div>
          <h3 className="card-title">Histórico</h3>
        </div>
        <span className="focus-count">
          {items.length} {items.length === 1 ? "sessão" : "sessões"}
        </span>
      </div>
      <div className="history-list">
        {items.length === 0 ? (
          <div className="empty">Nenhum foco registrado hoje.</div>
        ) : (
          items.map((item) => (
            <div className="focus-history-item" key={item.id}>
              <div className="focus-history-duration" aria-label={`${item.minutes} minutos`}>
                <strong>{item.minutes}</strong>
                <span>min</span>
              </div>

              <div className="focus-history-content">
                <strong className="focus-history-title">{item.label || "Sessão de foco"}</strong>
                <span className="focus-history-time">
                  <Clock3 size={14} aria-hidden="true" />
                  {item.startedAt && item.endedAt
                    ? `${item.startedAt} – ${item.endedAt}`
                    : `Concluído às ${item.createdAt}`}
                </span>
              </div>

              <button
                className="focus-delete-button"
                type="button"
                aria-label={`Excluir ${item.label || "sessão de foco"}`}
                title="Excluir sessão"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 size={17} aria-hidden="true" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
