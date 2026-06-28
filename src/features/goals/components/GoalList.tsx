export type GoalItem = { id: string; text: string; done: boolean; date: string };

type GoalListProps = {
  goals: GoalItem[];
  onToggle: (id: string) => void;
};

export default function GoalList({ goals, onToggle }: GoalListProps) {
  return (
    <div className="card">
      <h3 className="card-title">Checklist de hoje</h3>
      <div className="history-list">
        {goals.length === 0 ? (
          <div className="empty">Nenhuma meta cadastrada hoje.</div>
        ) : (
          goals.map((goal) => (
            <button type="button" className="history-item" key={goal.id} onClick={() => onToggle(goal.id)}>
              <strong>{goal.done ? "✅" : "⬜"} {goal.text}</strong>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
