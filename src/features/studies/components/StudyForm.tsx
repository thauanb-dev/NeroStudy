import { BookOpenCheck } from "lucide-react";
import type { FormEvent } from "react";
import Card from "../../../shared/components/ui/Card";
import SectionTitle from "../../../shared/components/ui/SectionTitle";
import type { StudyFormData } from "../types";

type StudyFormProps = {
  value: StudyFormData;
  isEditing: boolean;
  onChange: (value: StudyFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancelEdit: () => void;
};

const fields = [
  ["materia", "Matéria", "text"],
  ["topic", "Assunto", "text"],
  ["minutes", "Minutos", "number"],
  ["questoes", "Questões", "number"],
  ["hits", "Acertos", "number"],
  ["errors", "Erros", "number"],
] as const;

export default function StudyForm({ value, isEditing, onChange, onSubmit, onCancelEdit }: StudyFormProps) {
  return (
    <Card className="feature-panel study-form-panel">
      <SectionTitle
        eyebrow="Gestor de estudo"
        title={isEditing ? "Editar estudo" : "Registrar estudo"}
        icon={<BookOpenCheck size={18} aria-hidden="true" />}
      />
      <form className="feature-form study-form-grid" onSubmit={onSubmit}>
        {fields.map(([field, placeholder, type]) => (
          <label className="feature-field" key={field}>
            <span>{placeholder}</span>
            <input
              type={type}
              placeholder={placeholder}
              value={value[field]}
              onChange={(event) => onChange({ ...value, [field]: event.target.value })}
            />
          </label>
        ))}
        <div className="feature-form-actions">
          <button className="btn primary feature-submit" type="submit">
            {isEditing ? "Salvar alterações" : "Adicionar registro"}
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
