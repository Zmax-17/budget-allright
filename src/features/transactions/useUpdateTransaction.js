import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { updateTransactionApi } from "../../services/apiTransactions";
import toast from "react-hot-toast";

export function useUpdateTransaction() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateTransaction } = useMutation({
    mutationFn: (transaction) => updateTransactionApi(transaction, user?.id),
    onMutate: async (newTransaction) => {
      await queryClient.cancelQueries({ queryKey: ["transactions", user?.id] });

      const previousTransactions = queryClient.getQueryData(["transactions", user?.id]) || { data: [] };

      queryClient.setQueryData(["transactions", user?.id], (old) => {
        if (!old?.data) return { data: [newTransaction] };
        return {
          data: old.data.map((tx) =>
            tx.id === newTransaction.id ? newTransaction : tx
          ),
        };
      });

      return { previousTransactions };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id] });
      toast.success("Transaction updated successfully");
    },
    onError: (err, variables, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(["transactions", user?.id], context.previousTransactions);
      }
      console.error("Update error:", variables, err.message);
      toast.error(`Error updating transaction: ${err.message} (Data: ${JSON.stringify(variables)})`);
    },
  });

  return { isUpdating, updateTransaction };
}