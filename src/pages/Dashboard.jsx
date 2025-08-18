import BalanceCard from "../features/dashboard/BalanceCard.jsx";
import { useDashboardData } from "../features/dashboard/useDashboardData.js";

import { useState } from "react";

import PieChartCategoryWithdraw from "../features/charts/PieChartCategoryWithdraw.jsx";
import LineChartBlock from "../features/charts/LineChartBlock.jsx";
import BarChartBlock from "../features/charts/BarChartBlock.jsx";
import SubCatBarChartBlock from "../features/charts/SubCatBarChartBlock.jsx";

import { useMonth } from "../context/MonthContext.jsx";

import toast from "react-hot-toast";
import EmptyDashboard from "../features/dashboard/emptyDashboard.jsx";
import LoadingSpinner from "../ui/LoadingSpinner.jsx";
import SortControls from "../ui/SortControls.jsx";

function Dashboard() {
  const { selectedMonth, setSelectedMonth } = useMonth();

  const [selectedCategory, setSelectedCategory] =
    useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const {
    isLoading,
    error,

    // Finance
    balance,
    monthlyIncome: income,
    monthlyWithdraw: withdraw,

    // Charts
    pieData,
    lineData,

    // Sorts
    sortBarData,

    // Subcategory
    getBarDataBySubCategory,

    // Month
    minMonth,
    maxMonth,
  } = useDashboardData(selectedMonth);

  const sortedData = sortBarData(
    sortConfig.key,
    sortConfig.direction
  );

  if (isLoading)
    return (
      <LoadingSpinner message="Dashboard loading..." />
    );
  if (error)
    return "An error has occurred: " + toast.error.message;
  if (sortedData.length === 0) return <EmptyDashboard />;
  return (
    <div className="p-4 space-y-6">
      <BalanceCard
        balance={balance}
        income={income}
        withdraw={withdraw}
        selectedMonth={selectedMonth}
      />
      <div className="w-fit">
        <label
          htmlFor="month"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select month
        </label>
        <input
          id="month"
          className="w-48 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          type="month"
          name="Select month"
          value={selectedMonth}
          min={minMonth}
          max={maxMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>
      {/*  Filtering */}
      <SortControls
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
      />

      {/* // If no pieData, don't show the chart */}
      {pieData && pieData.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">
            Spending Category Chart
          </h3>
          <PieChartCategoryWithdraw data={pieData} />
        </div>
      )}
      <div>
        <h3 className="text-lg font-medium">
          Income and expenses by day
        </h3>
        <LineChartBlock data={lineData} />
      </div>
      <div>
        <h3 className="text-lg font-medium">
          Income and Expense Graph by Category
        </h3>
        <BarChartBlock
          data={sortedData}
          onCategoryClick={(categoryName) =>
            setSelectedCategory(categoryName)
          }
        />
      </div>

      {selectedCategory && (
        <div>
          <h3 className="text-lg font-medium">
            Expenses by category : {selectedCategory}
          </h3>
          <SubCatBarChartBlock
            data={getBarDataBySubCategory(selectedCategory)}
          />
          <button
            className="mt-2 text-sm underline"
            onClick={() => setSelectedCategory(null)}
          >
            Back to all categories
          </button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
