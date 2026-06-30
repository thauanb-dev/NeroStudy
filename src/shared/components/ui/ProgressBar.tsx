type ProgressBarProps = {
  value: number;
  label: string;
};

export default function ProgressBar({ value, label }: ProgressBarProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="ui-progress" aria-label={label}>
      <span style={{ width: `${safeValue}%` }} />
    </div>
  );
}
