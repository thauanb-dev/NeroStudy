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
  return (
    <div className="card timer-card">
      <span className="mode-badge">
        {isRunning ? "Sessão em andamento" : "Sessão ativa"}
      </span>
      <div className="timer">{time}</div>
      <p className="timer-status">
        {isRunning ? "Foco em andamento" : "Pronto para iniciar"}
      </p>
      <div className="focus-label-field">
        <label htmlFor="focus-label">No que você vai focar?</label>
        <input
          id="focus-label"
          type="text"
          value={label}
          onChange={(event) => onLabelChange(event.target.value)}
          placeholder="Nome do seu foco"
        />
      </div>
      <div className="controls">
        <button className="btn primary" type="button" onClick={onStart}>
          Iniciar
        </button>
        <button className="btn" type="button" onClick={onPause}>
          Pausar
        </button>
        <button className="btn" type="button" onClick={onReset}>
          Resetar
        </button>
        <button className="btn" type="button" onClick={onFinish}>
          Finalizar
        </button>
      </div>
      <div className="config-row">
        <span>Duração</span>
        <input
          type="number"
          value={minutes}
          min="1"
          aria-label="Duração da sessão em minutos"
          onChange={(event) => onMinutesChange(Number(event.target.value))}
        />
        <button className="btn small" type="button" onClick={onApply}>
          Aplicar
        </button>
      </div>
    </div>
  );
}
