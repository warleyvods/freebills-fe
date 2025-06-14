import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export function useDeleteTransaction() {
  const toast = useToast();
  return useMutation({
    mutationFn: async (transactionId: number) => {
      return await api.delete(`v1/transactions/${transactionId}`);
    },
    onSuccess: async () => {
      toast({
        title: "Transação Excluída",
        description: "Transação excluída com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })

      queryClient.invalidateQueries({ queryKey: ['balance-expense'] })
      queryClient.invalidateQueries({ queryKey: ['balance-revenue'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-expense'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-revenue'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      queryClient.invalidateQueries({ queryKey: ['balance'] })
    }, 
    onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top"
      })
    }
  });
}
