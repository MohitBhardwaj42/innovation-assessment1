import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Pillar = "Strategy" | "Capacity" | "Discipline" | "Performance";
type Scores = Record<Pillar, number>;

export default function BarResult({ scores }: { scores: Scores }) {
  const data = [
    { pillar: "Strategy", score: scores.Strategy || 0 },
    { pillar: "Capacity", score: scores.Capacity || 0 },
    { pillar: "Discipline", score: scores.Discipline || 0 },
    { pillar: "Performance", score: scores.Performance || 0 },
  ];

  console.log("FINAL BAR DATA 👉", data);

  return (
    <div style={{ marginTop: "20px" }}>
      <BarChart
        width={500}
        height={300}
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 9]} />
        <YAxis type="category" dataKey="pillar" />
        <Tooltip />
        <Bar dataKey="score" fill="#4f46e5" barSize={30} />
      </BarChart>
    </div>
  );
}

