import { useQuery } from "@tanstack/react-query";
import { getTransactionsByCategory } from "../../services/apiTransactions";

export function useTransactionsByCategory(category) {
  const {
    isLoading,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["transactions", category],
    queryFn: () => getTransactionsByCategory(category),
    enabled: !!category, // if category exist
  });
  return { isLoading, error, transactions };
}

