import "../../styles/devStyle.css"


type DebugProps = {
    label?: String;
    value;
}

export default function Debug( { label = "Debug" , value }:DebugProps){
    // se nao estiver no ambiente dev, ele pula
    if (process.env.NODE_ENV != "development") return null 
    return(
    <details open>
      <summary>{label}</summary>
      <pre
        style={{
          overflow: "auto",
          padding: 12,
          borderRadius: 8,
          background: "#111",
          color: "#7cff7c",
          fontSize: 12,
        }}
      >
        {JSON.stringify(value, null, 2)}
      </pre>
    </details>
  );
}
