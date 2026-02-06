import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Props = {
  scores: Record<string, number>;
};

export default function RadarResult({ scores }: Props) {
  const data = {
    labels: Object.keys(scores),
    datasets: [
      {
        label: "Innovation Profile",
        data: Object.values(scores),
        fill: true,
        backgroundColor: "rgba(79,70,229,0.2)",
        borderColor: "#4f46e5",
        pointBackgroundColor: "#4f46e5",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: { stepSize: 2 },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
