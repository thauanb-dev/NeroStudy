import "../../styles/devStyle.css"

type DebugProps = {
    label?: string;
    value;
}

export default function Debug({ label = "Debug", value }: DebugProps) {
  // Não renderiza o painel fora do ambiente de desenvolvimento.
  if (process.env.NODE_ENV !== "development") return null;

  const _code = JSON.stringify(value, null, 2) ?? String(value);

  return (
    <details className="debug-panel" open>
      <summary>{label}</summary>
      <pre>
        {_code}
      </pre>
    </details>
  );
}
