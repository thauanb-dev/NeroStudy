import type { FormEvent } from "react";

type GoalFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function GoalForm({ value, onChange, onSubmit }: GoalFormProps) {
  return (
    <div className="card">
      <h3 className="card-title">Nova meta</h3>
      <form className="form" onSubmit={onSubmit}>
        <input placeholder="Digite uma meta para hoje" value={value} onChange={(event) => onChange(event.target.value)} />
        <button className="btn primary" type="submit">Adicionar meta</button>
      </form>
    </div>
  );
}
