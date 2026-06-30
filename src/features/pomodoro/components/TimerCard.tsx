import { Check, Clock3, Minus, Pause, Play, Plus, RotateCcw, Target, X } from "lucide-react";

type TimerCardProps = {
  time: string;
  label: string;
  isRunning: boolean;
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onFinish: () => void;
  onApply: () => void;
  onLabelChange: (label: string) => void;
};

export default function TimerCard({
  label,
  time,
  isRunning,
  minutes,
  onMinutesChange,
  onStart,
  onPause,
  onReset,
  onFinish,
  onApply,
  onLabelChange,
}: TimerCardProps) {
  const durationPresets = [25, 30, 45, 60];
  const focusSuggestions = ["Revisão", "Exercícios", "Leitura", "Projeto"];
  const canDecreaseDuration = minutes > 1;

  function handleDurationStep(step: number) {
    onMinutesChange(Math.max(1, minutes + step));
  }

  function handleDurationInput(value: string) {
    onMinutesChange(Math.max(1, Number(value) || 1));
  }

  return (
    <div className="card timer-card">
      <span className="mode-badge">
        {isRunning ? "Sessão em andamento" : "Sessão ativa"}
      </span>
      <div className="timer">{time}</div>
      <p className="timer-status">
        {isRunning ? "Foco em andamento" : "Pronto para iniciar"}
      </p>
      <div className="focus-label-panel">
        <div className="focus-label-heading">
          <span className="focus-label-icon" aria-hidden="true">
            <Target size={16} />
          </span>
          <div>
            <label htmlFor="focus-label">Nome do foco</label>
            <span>{label.trim() || "Sessão de foco"}</span>
          </div>
        </div>

        <div className="focus-label-input-wrap">
          <input
            id="focus-label"
            type="text"
            value={label}
            maxLength={48}
            onChange={(event) => onLabelChange(event.target.value)}
            placeholder="Ex: Matemática - funções"
          />
          {label ? (
            <button
              type="button"
              className="focus-label-clear"
              onClick={() => onLabelChange("")}
              aria-label="Limpar nome do foco"
              title="Limpar"
            >
              <X size={15} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="focus-label-footer">
          <div className="focus-suggestions" aria-label="Sugestões de foco">
            {focusSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className={label === suggestion ? "active" : undefined}
                onClick={() => onLabelChange(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <span>{label.length}/48</span>
        </div>
      </div>
      <div className="controls timer-controls" aria-label="Controles do cronômetro">
        <button
          className="timer-control primary"
          type="button"
          onClick={onStart}
          disabled={isRunning}
          aria-label="Iniciar sessão"
          title="Iniciar"
        >
          <Play size={21} fill="currentColor" aria-hidden="true" />
        </button>
        <button
          className="timer-control"
          type="button"
          onClick={onPause}
          disabled={!isRunning}
          aria-label="Pausar sessão"
          title="Pausar"
        >
          <Pause size={21} fill="currentColor" aria-hidden="true" />
        </button>
        <button
          className="timer-control"
          type="button"
          onClick={onReset}
          aria-label="Reiniciar cronômetro"
          title="Reiniciar"
        >
          <RotateCcw size={20} aria-hidden="true" />
        </button>
        <button
          className="timer-control finish"
          type="button"
          onClick={onFinish}
          aria-label="Finalizar e salvar sessão"
          title="Finalizar e salvar"
        >
          <Check size={22} aria-hidden="true" />
        </button>
      </div>
      <div className="duration-config" aria-label="Configuração de duração">
        <div className="duration-config-heading">
          <span className="duration-config-icon" aria-hidden="true">
            <Clock3 size={16} />
          </span>
          <div>
            <span>Duração</span>
            <strong>{minutes} min</strong>
          </div>
        </div>

        <div className="duration-stepper">
          <button
            type="button"
            className="duration-step-button"
            onClick={() => handleDurationStep(-5)}
            disabled={!canDecreaseDuration}
            aria-label="Diminuir duração em 5 minutos"
            title="Diminuir 5 min"
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <label className="duration-input-field">
            <span className="sr-only">Duração da sessão em minutos</span>
            <input
              type="number"
              value={minutes}
              min="1"
              aria-label="Duração da sessão em minutos"
              onChange={(event) => handleDurationInput(event.target.value)}
            />
            <small>min</small>
          </label>
          <button
            type="button"
            className="duration-step-button"
            onClick={() => handleDurationStep(5)}
            aria-label="Aumentar duração em 5 minutos"
            title="Aumentar 5 min"
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="duration-presets" aria-label="Durações rápidas">
          {durationPresets.map((preset) => (
            <button
              key={preset}
              type="button"
              className={minutes === preset ? "active" : undefined}
              onClick={() => onMinutesChange(preset)}
            >
              {preset}
            </button>
          ))}
        </div>

        <button className="btn duration-apply-button" type="button" onClick={onApply}>
          Aplicar duração
        </button>
      </div>
    </div>
  );
}
