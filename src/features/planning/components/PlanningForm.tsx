import type { FormEvent } from "react";

export type PlanFormData = { day: string; materia: string; task: string };

type PlanningFormProps = {
  value: PlanFormData;
  isEditing: boolean;
  onChange: (value: PlanFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function PlanningForm({ value, isEditing, onChange, onSubmit }: PlanningFormProps) {
  return (
    <div className="card">
      <h3 className="card-title">{isEditing ? "Editar planejamento" : "Novo planejamento"}</h3>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <input type="date" value={value.day} onChange={(event) => onChange({ ...value, day: event.target.value })} />
        <input placeholder="Matéria" value={value.materia} onChange={(event) => onChange({ ...value, materia: event.target.value })} />
        <input placeholder="Tarefa / assunto" value={value.task} onChange={(event) => onChange({ ...value, task: event.target.value })} />
        <button className="btn primary" type="submit">
          {isEditing ? "Salvar alterações" : "Adicionar planejamento"}
        </button>
      </form>
    </div>
  );
}
