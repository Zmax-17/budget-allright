import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

function BarChartBlock({ data, onCategoryClick }) {
  return (
    // <div className="w-full h-96 ">
    <div>
      <ResponsiveContainer
        width="100%"
        height={340}
      >
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* Горизонтальная ось */}
          <XAxis
            dataKey="name"
            angle={-15}
            textAnchor="end"
            interval={0}
            height={60}
          />

          {/* Вертикальная ось (логарифмическая шкала) */}
          <YAxis
            scale="log"
            domain={[1, "auto"]}
            allowDataOverflow
            tickFormatter={(value) => `${value}`}
          />

          <Legend
            verticalAlign="top"
            height={36}
          />
          <Tooltip />

          {/* Доходы */}
          <Bar
            dataKey="income"
            name="Income"
            barSize={30}
            radius={[4, 4, 0, 0]}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`income-${index}`}
                fill="#4ade80"
              />
            ))}
          </Bar>

          {/* Расходы */}
          <Bar
            dataKey="withdraw"
            name="Withdraw"
            barSize={30}
            radius={[4, 4, 0, 0]}
            label={{ position: "top" }}
            onClick={(entry) =>
              onCategoryClick?.(entry.name)
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`withdraw-${index}`}
                fill={entry.color || "#f87171"} // Красный по умолчанию
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartBlock;
