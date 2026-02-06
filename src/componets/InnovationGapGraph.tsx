type Pillar = "Strategy" | "Capacity" | "Discipline" | "Performance";

type Responses = Record<
  string,
  {
    current?: number;
    desired?: number;
  }
>;

type Props = {
  responses: Responses;
  framework: {
    pillar: Pillar;
    questions: string[];
  }[];
};

export default function InnovationGapGraph({ responses, framework }: Props) {
  const maxScore = 10;
  const chartHeight = 200;
  const chartBottom = 250;
  const chartTop = chartBottom - chartHeight;

  const scaleY = (value: number) =>
    chartBottom - (value / maxScore) * chartHeight;

  const data = framework.map((section) => {
    const values = section.questions
      .map((_, i) => responses[`${section.pillar}-${i}`])
      .filter(Boolean);

    const currentAvg =
      values.reduce((a, b) => a + (b!.current ?? 0), 0) / values.length;

    const desiredAvg =
      values.reduce((a, b) => a + (b!.desired ?? 0), 0) / values.length;

    return {
      pillar: section.pillar,
      current: currentAvg,
      desired: desiredAvg,
    };
  });

  return (
    <svg viewBox="0 0 600 320" width="100%" height="320">
      {/* Y axis */}
      <line x1={60} y1={chartTop} x2={60} y2={chartBottom} stroke="#000" />

      {/* X axis */}
      <line x1={60} y1={chartBottom} x2={560} y2={chartBottom} stroke="#000" />

      {/* Y axis labels & grid */}
      {Array.from({ length: 11 }).map((_, i) => {
        const y = scaleY(i);
        return (
          <g key={i}>
            <line x1={55} y1={y} x2={60} y2={y} stroke="#000" />
            <text
              x={45}
              y={y + 4}
              fontSize="10"
              textAnchor="end"
            >
              {i}
            </text>

            {/* grid line */}
            <line
              x1={60}
              y1={y}
              x2={560}
              y2={y}
              stroke="#e5e7eb"
            />
          </g>
        );
      })}

      {/* Data points */}
      {data.map((d, i) => {
        const x = 120 + i * 120;
        const currentY = scaleY(d.current);
        const desiredY = scaleY(d.desired);

        return (
          <g key={d.pillar}>
            {/* gap line */}
            <line
              x1={x}
              y1={currentY}
              x2={x}
              y2={desiredY}
              stroke="#9ca3af"
              strokeDasharray="4"
            />

            {/* current */}
            <circle cx={x} cy={currentY} r={6} fill="#4f46e5" />
            <text x={x + 10} y={currentY + 4} fontSize="10">
              {d.current.toFixed(1)}
            </text>

            {/* desired */}
            <circle cx={x} cy={desiredY} r={6} fill="#22c55e" />
            <text x={x + 10} y={desiredY + 4} fontSize="10">
              {d.desired.toFixed(1)}
            </text>

            {/* X axis label */}
            <text
              x={x}
              y={chartBottom + 20}
              textAnchor="middle"
              fontSize="12"
            >
              {d.pillar}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

