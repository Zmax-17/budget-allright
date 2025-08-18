
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { createTransaction } from "../../services/apiTransactions";
import toast from "react-hot-toast";

export function useAddTransaction() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addTransaction } = useMutation({
    mutationFn: (transaction) => createTransaction(transaction, user?.id),
    onMutate: async (newTransaction) => {
      await queryClient.cancelQueries({ queryKey: ["transactions", user?.id] });

      const previousTransactions = queryClient.getQueryData(["transactions", user?.id]) || { data: [] };

      queryClient.setQueryData(["transactions", user?.id], (old) => {
        if (!old?.data) return { data: [newTransaction] };
        return { data: [newTransaction, ...old.data] };
      });

      return { previousTransactions };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
      toast.success("Transaction created successfully");
      console.log("Create success:", data);
    },
    onError: (err, variables, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(["transactions", user?.id], context.previousTransactions);
      }
      console.error("Create error:", err.message);
      toast.error(`Error creating transaction: ${err.message} (Data: ${JSON.stringify(variables)})`);
    },
  });

  return { isAdding, addTransaction };
}