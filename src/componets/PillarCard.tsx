type Props = {
  pillar: string;
  score: number;
  maturity:string;
  recommendation:string;
};

export default function PillarCard({ pillar, score,maturity }: Props) {
  const level =
    score <= 3 ? "Early Stage" :
    score <= 6 ? "Developing" :
    score <= 8 ? "Advanced" :
    "Leading";

  const color =
    score <= 3 ? "#dc2626" :
    score <= 6 ? "#f59e0b" :
    score <= 8 ? "#10b981" :
    "#2563eb";

  return (
    <div
      className="pillar-card"
      style={{
        border: `2px solid ${color}`,
        borderRadius: "12px",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <h3>{pillar}</h3>
      <h1 style={{ color }}>{score.toFixed(1)}</h1>
      <p>{maturity}</p>
    </div>
  );
}
