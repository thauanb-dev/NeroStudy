"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";

type ManualFocusFormProps = {
  onAdd: (data: { label: string; minutes: number }) => void;
};

export default function ManualFocusForm({ onAdd }: ManualFocusFormProps) {
  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState(30);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const safeMinutes = Math.max(1, Number(minutes) || 1);
    onAdd({ label: label.trim() || "Sessão de foco", minutes: safeMinutes });
    setLabel("");
    setMinutes(30);
  }

  return (
    <div className="card manual-focus-card">
      <div className="focus-card-heading">
        <div>
          <span className="focus-eyebrow">Registro rápido</span>
          <h3 className="card-title">Adicionar sessão concluída</h3>
        </div>
      </div>

      <form className="manual-focus-form" onSubmit={handleSubmit}>
        <div className="manual-focus-fields">
          <input
            type="text"
            value={label}
            placeholder="Ex.: Revisão de matemática"
            aria-label="Nome da sessão concluída"
            onChange={(event) => setLabel(event.target.value)}
          />
          <div className="manual-minutes-field">
            <input
              type="number"
              value={minutes}
              min="1"
              aria-label="Duração da sessão concluída em minutos"
              onChange={(event) => setMinutes(Number(event.target.value))}
            />
            <span>min</span>
          </div>
        </div>
        <button className="btn primary manual-add-button" type="submit">
          <Plus size={17} aria-hidden="true" />
          Adicionar sessão
        </button>
      </form>
    </div>
  );
}
