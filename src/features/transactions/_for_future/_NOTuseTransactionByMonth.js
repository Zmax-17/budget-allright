// For future use, this file is currently not being used.
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "../../context/AuthContext";
// import { getAllMonthTransactions } from "../../services/apiTransactions";

// export function useTransactionsByMonth(selectedMonth) {
//   const { user } = useAuth();

//   const {
//     isLoading,
//     error,
//     data: transactions,
//   } = useQuery({
//     queryKey: ["transactions", user?.id, "month", selectedMonth],
//     queryFn: () => getAllMonthTransactions(selectedMonth, user?.id),
//     enabled: !!user && !!selectedMonth,
//     keepPreviousData: true,
//   });

//   return {
//     isLoading,
//     error,
//     transactions: transactions?.data || [],
//   };
// }

