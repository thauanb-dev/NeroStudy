import type { FormEvent } from "react";
import type { StudyFormData } from "../types";

type StudyFormProps = {
  value: StudyFormData;
  onChange: (value: StudyFormData) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const fields = [
  ["materia", "Matéria", "text"],
  ["topic", "Assunto", "text"],
  ["minutes", "Minutos", "number"],
  ["questoes", "Questões", "number"],
  ["hits", "Acertos", "number"],
  ["errors", "Erros", "number"],
] as const;

export default function StudyForm({ value, onChange, onSubmit }: StudyFormProps) {
  return (
    <div className="card">
      <h3 className="card-title">Registrar estudo</h3>
      <form className="form" onSubmit={onSubmit}>
        {fields.map(([field, placeholder, type]) => (
          <input
            key={field}
            type={type}
            placeholder={placeholder}
            value={value[field]}
            onChange={(event) => onChange({ ...value, [field]: event.target.value })}
          />
        ))}
        <button className="btn primary" type="submit">Adicionar registro</button>
      </form>
    </div>
  );
}
