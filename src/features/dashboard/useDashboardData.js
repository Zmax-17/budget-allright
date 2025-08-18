import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getAllTransactions } from "../../services/apiTransactions";
import { format } from "date-fns";
import { CATEGORY_COLORS } from "../categories/categories";
import { CATEGORIES_FLATTENED } from "../categories/categoriesJSON";
import { getMonthDateRange } from "../../utils/dataRange";


export function useDashboardData(selectedDate) {
  const { user } = useAuth();

  const { data: allTransactionsResponse = { data: [] }, isLoading, error } = useQuery({
    queryKey: ["dashboard-data", selectedDate, user?.id],
    queryFn: () => getAllTransactions(user?.id),
    enabled: !!user,
  });

  // Extracting an array of transactions
  const allTransactions = allTransactionsResponse.data || [];

  // 2. Filter by selected month (on the front)
  const { fromDate, toDate } = getMonthDateRange(selectedDate);


  const monthlyTransactions = allTransactions.filter((t) => t.date >= fromDate && t.date <= toDate);

  // Calculations that depend on allTransactions and monthlyTransactions
  const balance = !isLoading && allTransactions.length > 0 ? allTransactions.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0) : 0;

  const monthlyIncome = !isLoading && monthlyTransactions.length > 0 ? monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0) : 0;

  const monthlyWithdraw = !isLoading && monthlyTransactions.length > 0 ? monthlyTransactions
    .filter((t) => t.type === "withdraw")
    .reduce((acc, t) => acc + t.amount, 0) : 0;

  // PieData
  const pieData = !isLoading && monthlyTransactions.length > 0 ? monthlyTransactions
    .filter((tx) => tx.type === "withdraw")
    .reduce((acc, tx) => {
      const existing = acc.find((item) => item.name === tx.main_category);
      if (existing) {
        existing.value += tx.amount;
      } else {
        acc.push({
          name: tx.main_category,
          value: tx.amount,
          color: CATEGORY_COLORS[tx.main_category] || "#ccc",
        });
      }
      return acc;
    }, []) : [];

  // LineChart data
  const dailyMap = !isLoading && monthlyTransactions.length > 0 ? {} : {};
  if (!isLoading && monthlyTransactions.length > 0) {
    monthlyTransactions.forEach((tx) => {
      const date = format(new Date(tx.date), "yyyy-MM-dd");
      if (!dailyMap[date]) {
        dailyMap[date] = { date, income: 0, withdraw: 0 };
      }
      dailyMap[date][tx.type] += tx.amount;
    });
  }
  const lineData = !isLoading && monthlyTransactions.length > 0 ? Object.values(dailyMap).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  ) : [];

  // BarChart data
  const barData = !isLoading && monthlyTransactions.length > 0 ? [] : [];
  if (!isLoading && monthlyTransactions.length > 0) {
    ["income", "withdraw"].forEach((type) => {
      const grouped = monthlyTransactions
        .filter((tx) => tx.type === type)
        .reduce((acc, tx) => {
          const cat = tx.main_category;
          acc[cat] = (acc[cat] || 0) + tx.amount;
          return acc;
        }, {});
      Object.entries(grouped).forEach(([name, value]) => {
        const existing = barData.find((item) => item.name === name);
        if (existing) {
          existing[type] = value;
        } else {
          barData.push({
            name,
            [type]: value,
            color: CATEGORY_COLORS[name] || "#ccc",
          });
        }
      });
    });
  }

  const sortBarData = (key, direction) => {
    if (!key || !direction) return barData;
    return [...barData].sort((a, b) =>
      direction === "asc" ? a[key] - b[key] : b[key] - a[key]
    );
  };

  const getAmountBySubCategory = (categoryName) => {
    return !isLoading && monthlyTransactions.length > 0 ? monthlyTransactions
      .filter((item) => item.main_category === categoryName)
      .reduce((acc, item) => {
        const key = item.sub_category || "Uncategorized";
        acc[key] = (acc[key] || 0) + item.amount;
        return acc;
      }, {}) : {};
  };

  const getBarDataBySubCategory = (categoryName) => {
    const subCategoryData = getAmountBySubCategory(categoryName);
    return !isLoading && monthlyTransactions.length > 0 ? Object.entries(subCategoryData).map(([sub_category, amount]) => ({
      sub_category,
      amount,
      color: CATEGORIES_FLATTENED.find((cat) => cat.name === sub_category)?.color || "#ccc",
    })) : [];
  };

  const availableMonths = !isLoading && allTransactions.length > 0 ? Array.from(
    new Set(allTransactions.map((t) => format(new Date(t.date), "yyyy-MM")))
  ).sort() : [];

  const minMonth = availableMonths[0] || null;
  const maxMonth = availableMonths[availableMonths.length - 1] || null;

  return {
    isLoading,
    error,
    balance,
    monthlyIncome,
    monthlyWithdraw,
    monthlyTransactions,
    pieData,
    lineData,
    barData,
    sortBarData,
    getBarDataBySubCategory,
    availableMonths,
    minMonth,
    maxMonth,
  };
}

