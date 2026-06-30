import { CalendarCheck2, CheckCircle2, Circle, Pencil, TrashIcon } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import EmptyState from "../../../shared/components/ui/EmptyState";
import SectionTitle from "../../../shared/components/ui/SectionTitle";
import type { PlanItem } from "../types";

type WeeklyPlanListProps = {
  plans: PlanItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (item: PlanItem) => void;
};

function formatDate(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

export default function WeeklyPlanList({
  plans,
  onToggle,
  onDelete,
  onEdit,
}: WeeklyPlanListProps) {
  return (
    <Card className="feature-panel">
      <SectionTitle
        eyebrow="Semana"
        title="Plano semanal"
        icon={<CalendarCheck2 size={18} aria-hidden="true" />}
      />

      <div className="feature-list">
        {plans.length === 0 ? (
          <EmptyState message="Nenhum planejamento cadastrado." />
        ) : (
          plans.map((item) => (
            <div
              className={`feature-list-item planning-item ${item.done ? "is-done" : ""}`}
              key={item.id}
            >
              <button
                type="button"
                className="feature-main-action"
                onClick={() => onToggle(item.id)}
                aria-label={`Marcar ${item.materia}: ${item.task} como ${
                  item.done ? "pendente" : "concluída"
                }`}
                aria-pressed={item.done}
              >
                <span className="feature-list-icon" aria-hidden="true">
                  {item.done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                </span>

                <span className="feature-list-content">
                  <small>{formatDate(item.day)}</small>
                  <strong>{item.materia}</strong>
                  <span>{item.task}</span>
                </span>
              </button>

              <div className="feature-actions">
                <button
                  className="feature-icon-button danger"
                  type="button"
                  onClick={() => onDelete(item.id)}
                  aria-label={`Remover ${item.materia}`}
                >
                  <TrashIcon size={16} aria-hidden="true" />
                </button>
                <button
                  className="feature-icon-button"
                  type="button"
                  onClick={() => onEdit(item)}
                  aria-label={`Editar ${item.materia}`}
                >
                  <Pencil size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
