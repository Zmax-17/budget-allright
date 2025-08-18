
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../services/apiTransactions";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";


export function useDelTransaction() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: delTransaction } = useMutation({
    mutationFn: (transactionId) => deleteTransaction(transactionId, user?.id),
    onMutate: async (transactionId) => {
      await queryClient.cancelQueries({ queryKey: ["transactions", user?.id] });

      const previousTransactions = queryClient.getQueryData(["transactions", user?.id]) || { data: [] };


      queryClient.setQueryData(["transactions", user?.id], (old) => {
        if (!old?.data) return { data: [] };
        return { data: old.data.filter((t) => t.id !== transactionId) };
      });

      return { previousTransactions };
    },
    onError: (error, transactionId, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(["transactions", user?.id], context.previousTransactions);
      }
      toast.error("Error deleting transaction");
      console.error("Delete error:", error.message);
    },
    onSuccess: () => {
      // Invalidate all queries starting with "transactions" for the user
      queryClient.invalidateQueries({ queryKey: ["transactions", user?.id], exact: false });
      toast.success("Transaction deleted successfully");
    },
  });

  return { isDeleting, delTransaction };
}