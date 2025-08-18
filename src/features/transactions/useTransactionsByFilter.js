import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { getTransactionsByFilter } from "../../services/apiTransactions";

export function useTransactionsByFilter(filter) {
  const { user } = useAuth();

  const {
    isLoading,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["transactions", user?.id, JSON.stringify(filter)], // Unique key with user_id and filter
    queryFn: () => getTransactionsByFilter(filter, user?.id), // We pass user_id
    enabled: !!user, // Request for authorized users only
  });

  return { isLoading, error, transactions: transactions?.data || [] }; //  guarantee an array
}

