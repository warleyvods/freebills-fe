import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export function useDeleteTransaction() {
  const toast = useToast();
  return useMutation(async (transactionId: number) => {
    return await api.delete(`v1/transactions/${transactionId}`);
  }, {
    onSuccess: async () => {
      toast({
        title: "Transação Excluída",
        description: "Transação excluída com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
      await queryClient.invalidateQueries(['balance-revenue'])
      await queryClient.invalidateQueries(['transaction-expense'])
      await queryClient.invalidateQueries(['transaction-revenue'])
      await queryClient.invalidateQueries(['transaction'])
      await queryClient.invalidateQueries(['balance'])
    }, onError: (err: any) => {
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
