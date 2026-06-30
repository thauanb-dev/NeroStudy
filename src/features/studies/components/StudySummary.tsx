import { BookMarked, Pencil, Target, Trash2 } from "lucide-react";
import Card from "../../../shared/components/ui/Card";
import EmptyState from "../../../shared/components/ui/EmptyState";
import SectionTitle from "../../../shared/components/ui/SectionTitle";
import type { StudyItem } from "../types";

type StudySummaryProps = {
  studies: StudyItem[];
  totalMinutes: number;
  totalQuestions: number;
  onEdit: (item: StudyItem) => void;
  onDelete: (id: string) => void;
};

export default function StudySummary({ studies, totalMinutes, totalQuestions, onEdit, onDelete }: StudySummaryProps) {
  return (
    <Card className="feature-panel">
      <SectionTitle
        eyebrow="Resumo"
        title="Estudos de hoje"
        icon={<BookMarked size={18} aria-hidden="true" />}
      />
      <div className="feature-metrics">
        <div>
          <span>Tempo estudado</span>
          <strong>{totalMinutes}min</strong>
        </div>
        <div>
          <span>Questões feitas</span>
          <strong>{totalQuestions}</strong>
        </div>
      </div>
      <div className="feature-list">
        {studies.length === 0 ? (
          <EmptyState message="Nenhuma matéria registrada hoje." />
        ) : (
          studies.map((item) => (
            <div className="feature-list-item" key={item.id}>
              <span className="feature-list-icon" aria-hidden="true">
                <Target size={16} />
              </span>
              <div>
                <strong>{item.materia} - {item.topic}</strong>
                <small>{item.minutes}min • {item.questoes || 0} questões</small>
              </div>
              <div className="feature-actions">
                <button
                  className="feature-icon-button"
                  type="button"
                  onClick={() => onEdit(item)}
                  aria-label={`Editar estudo ${item.materia}`}
                  title="Editar estudo"
                >
                  <Pencil size={16} aria-hidden="true" />
                </button>
                <button
                  className="feature-icon-button danger"
                  type="button"
                  onClick={() => onDelete(item.id)}
                  aria-label={`Remover estudo ${item.materia}`}
                  title="Remover estudo"
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
