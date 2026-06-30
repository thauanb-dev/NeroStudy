import { Flag } from "lucide-react";
import type { FormEvent } from "react";
import Card from "../../../shared/components/ui/Card";
import SectionTitle from "../../../shared/components/ui/SectionTitle";

type GoalFormProps = {
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

export default function GoalForm({ value, isEditing, onChange, onSubmit, onCancelEdit }: GoalFormProps) {
  return (
    <Card className="feature-panel">
      <SectionTitle
        eyebrow="Metas do dia"
        title={isEditing ? "Editar meta" : "Nova meta"}
        icon={<Flag size={18} aria-hidden="true" />}
      />
      <form className="feature-form" onSubmit={onSubmit}>
        <label className="feature-field">
          <span>Meta</span>
          <input placeholder="Digite uma meta para hoje" value={value} onChange={(event) => onChange(event.target.value)} />
        </label>
        <div className="feature-form-actions">
          <button className="btn primary feature-submit" type="submit">
            {isEditing ? "Salvar alterações" : "Adicionar meta"}
          </button>
          {isEditing ? (
            <button className="btn feature-submit" type="button" onClick={onCancelEdit}>
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
