type Props = {
  pillar: string;
  score: number;
  maturity: string;
  recommendation: string;
};

export default function PillarCard({ pillar, score, maturity, recommendation }: Props) {
  // Logic for the border and text color
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
        backgroundColor: "#fff",
        height: "100%"
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{pillar}</h3>
      <h1 style={{ color, fontSize: "2.5rem", margin: "10px 0" }}>
        {score.toFixed(1)}
      </h1>
      <p style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "0.85rem" }}>
        {maturity}
      </p>
      <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "12px", lineHeight: "1.4" }}>
        {recommendation}
      </p>
    </div>
  );
}