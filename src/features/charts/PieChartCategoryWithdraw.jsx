import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function PieChartCategoryWithdraw({ data }) {
  console.log("PieChart", data);
  const sortedData = [...data].sort(
    (a, b) => b.value - a.value
  );

  return (
    <div>
      <ResponsiveContainer
        width="100%"
        minHeight={340}
      >
        <PieChart
          margin={{
            top: 0,
            right: 0,
            left: 15,
            bottom: 5,
          }}
        >
          <Pie
            data={sortedData}
            nameKey="name"
            dataKey="value"
            innerRadius={70}
            outerRadius={95}
            cx="40%"
            cy="50%"
            paddingAngle={4}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(1)}%`
            }
          >
            {sortedData.map((entry) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={entry.color}
                stroke={"#fff"}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="20%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartCategoryWithdraw;
