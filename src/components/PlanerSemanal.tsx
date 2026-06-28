import { Pencil, Trash2Icon, TrashIcon } from "lucide-react";

export type PlanItem = {
  id: string;
  day: string;
  materia: string;
  task: string;
  done: boolean;
  createdAt: string;
};

type PlanerSemanalProps = {
  plans: PlanItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: PlanItem) => void;
};

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function PlanerSemanal({
  plans,
  onToggle,
  onDelete,
  onEdit,
}: PlanerSemanalProps) {
  return (
    <div className="card">
      <h3 className="card-title">Plano semanal</h3>

      <div className="history-list">
        {plans.length === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">📭</span>
            <p>Nenhum planejamento cadastrado.</p>
          </div>
        ) : (
          plans.map((item) => (
            <div
              className={`history-card ${item.done ? "is-done" : ""}`}
              key={item.id}
            >
              <button
                type="button"
                className="card-main-action"
                onClick={() => onToggle(item.id)}
                aria-label={`Marcar ${item.materia}: ${item.task} como ${
                  item.done ? "pendente" : "concluída"
                }`}
                aria-pressed={item.done}
              >
                <span className="status-indicator" aria-hidden="true">
                  {item.done ? "✅" : "⬜"}
                </span>

                <span className="card-info">
                  <span className="card-date">{formatDate(item.day)}</span>
                  <strong className="card-title">{item.materia}</strong>
                  <span className="card-task">{item.task}</span>
                </span>
              </button>

              <div className="card-actions flex gap-4">
                <button
                  className="btn-delete"
                  type="button"
                  onClick={() => onDelete(item.id)}
                  //TODO Colocar um icone de Delete
                  aria-label={`Remover ${item.materia}`}
                >
                  <TrashIcon />
                </button>
                <button
                  className="btn small"
                  type="button"
                  onClick={() => onEdit(item)}
                >
                  <Pencil />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
