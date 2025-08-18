import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";
import { getAllTransactions } from "../../services/apiTransactions";

export function useTransactions() {
  const { user } = useAuth();

  const {
    isLoading,
    error,
    data: transactions,
  } = useQuery({
    queryKey: ["transactions", user?.id], // Unique key for different users
    queryFn: () => getAllTransactions(user?.id), // We pass user.id
    enabled: !!user, // The request is executed only if the user is authorized.
    staleTime: 0, gcTime: 0,
  });

  return {
    isLoading, error, transactions: transactions?.data || []
  };
}
