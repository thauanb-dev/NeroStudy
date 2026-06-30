import { CheckCircle2, Circle, ListChecks, Pencil, Trash2 } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import EmptyState from "../../../shared/components/ui/EmptyState";
import SectionTitle from "../../../shared/components/ui/SectionTitle";

export type GoalItem = { id: string; text: string; done: boolean; date: string };

type GoalListProps = {
  goals: GoalItem[];
  onToggle: (id: string) => void;
  onEdit: (goal: GoalItem) => void;
  onDelete: (id: string) => void;
};

export default function GoalList({ goals, onToggle, onEdit, onDelete }: GoalListProps) {
  return (
    <Card className="feature-panel">
      <SectionTitle
        eyebrow="Execução"
        title="Checklist de hoje"
        icon={<ListChecks size={18} aria-hidden="true" />}
      />
      <div className="feature-list">
        {goals.length === 0 ? (
          <EmptyState message="Nenhuma meta cadastrada hoje." />
        ) : (
          goals.map((goal) => (
            <div
              className={`feature-list-item goal-item ${goal.done ? "is-done" : ""}`}
              key={goal.id}
            >
              <button
                type="button"
                className="feature-main-action"
                onClick={() => onToggle(goal.id)}
                aria-pressed={goal.done}
                aria-label={`Marcar meta ${goal.text} como ${goal.done ? "pendente" : "concluída"}`}
              >
                <span className="feature-list-icon" aria-hidden="true">
                  {goal.done ? <CheckCircle2 size={17} /> : <Circle size={17} />}
                </span>
                <strong>{goal.text}</strong>
              </button>
              <div className="feature-actions">
                <button
                  className="feature-icon-button"
                  type="button"
                  onClick={() => onEdit(goal)}
                  aria-label={`Editar meta ${goal.text}`}
                  title="Editar meta"
                >
                  <Pencil size={16} aria-hidden="true" />
                </button>
                <button
                  className="feature-icon-button danger"
                  type="button"
                  onClick={() => onDelete(goal.id)}
                  aria-label={`Remover meta ${goal.text}`}
                  title="Remover meta"
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
