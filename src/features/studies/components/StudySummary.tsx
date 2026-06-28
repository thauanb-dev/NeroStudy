import type { StudyItem } from "../types";

type StudySummaryProps = {
  studies: StudyItem[];
  totalMinutes: number;
  totalQuestions: number;
};

export default function StudySummary({ studies, totalMinutes, totalQuestions }: StudySummaryProps) {
  return (
    <div className="card">
      <h3 className="card-title">Estudos de hoje</h3>
      <p>Tempo estudado: {totalMinutes}min</p>
      <p>Questões feitas: {totalQuestions}</p>
      <div className="history-list">
        {studies.length === 0 ? (
          <div className="empty">Nenhuma matéria registrada hoje.</div>
        ) : (
          studies.map((item) => (
            <div className="history-item" key={item.id}>
              <strong>{item.materia} — {item.topic}</strong>
              <span>{item.minutes}min • {item.questoes || 0} questões</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
