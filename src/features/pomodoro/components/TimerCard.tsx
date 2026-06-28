type TimerCardProps = {
  time: string;
  isRunning: boolean;
  minutes: number;
  onMinutesChange: (minutes: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onFinish: () => void;
  onApply: () => void;
};

export default function TimerCard({
  time,
  isRunning,
  minutes,
  onMinutesChange,
  onStart,
  onPause,
  onReset,
  onFinish,
  onApply,
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
      <div className="controls">
        <button className="btn primary" type="button" onClick={onStart}>Iniciar</button>
        <button className="btn" type="button" onClick={onPause}>Pausar</button>
        <button className="btn" type="button" onClick={onReset}>Resetar</button>
        <button className="btn" type="button" onClick={onFinish}>Finalizar</button>
      </div>
      <div className="config-row">
        <input
          type="number"
          value={minutes}
          min="1"
          aria-label="Duração da sessão em minutos"
          onChange={(event) => onMinutesChange(Number(event.target.value))}
        />
        <button className="btn small" type="button" onClick={onApply}>Aplicar</button>
      </div>
    </div>
  );
}
