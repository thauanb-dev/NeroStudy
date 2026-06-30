import { CalendarPlus } from "lucide-react";
import type { FormEvent } from "react";
import Card from "../../../shared/components/ui/Card";
import SectionTitle from "../../../shared/components/ui/SectionTitle";

export type PlanFormData = { day: string; materia: string; task: string };

type PlanningFormProps = {
  value: PlanFormData;
  isEditing: boolean;
  onChange: (value: PlanFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function PlanningForm({ value, isEditing, onChange, onSubmit }: PlanningFormProps) {
  return (
    <Card className="feature-panel">
      <SectionTitle
        eyebrow="Planejamento"
        title={isEditing ? "Editar planejamento" : "Novo planejamento"}
        icon={<CalendarPlus size={18} aria-hidden="true" />}
      />
      <form className="feature-form" onSubmit={onSubmit}>
        <label className="feature-field">
          <span>Data</span>
          <input type="date" value={value.day} onChange={(event) => onChange({ ...value, day: event.target.value })} />
        </label>
        <label className="feature-field">
          <span>Matéria</span>
          <input placeholder="Matéria" value={value.materia} onChange={(event) => onChange({ ...value, materia: event.target.value })} />
        </label>
        <label className="feature-field">
          <span>Tarefa</span>
          <input placeholder="Tarefa / assunto" value={value.task} onChange={(event) => onChange({ ...value, task: event.target.value })} />
        </label>
        <button className="btn primary feature-submit" type="submit">
          {isEditing ? "Salvar alterações" : "Adicionar planejamento"}
        </button>
      </form>
    </Card>
  );
}
