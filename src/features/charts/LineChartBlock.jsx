import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function LineChartBlock({ data }) {
  console.log("LineChart", data); //  { date: "2025-06-01", income: 0, withdraw: 1000 },

  return (
    <div>
      <div>
        <ResponsiveContainer
          width="60%"
          height={240}
        >
          <LineChart
            width={600}
            height={300}
            data={data}
          >
            <CartesianGrid
              stroke="#aaa"
              strokeDasharray="5 5"
            />{" "}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#4caf50"
            />
            <Line
              type="monotone"
              dataKey="withdraw"
              stroke="	#ef4444"
              strokeWidth={2}
            />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LineChartBlock;
