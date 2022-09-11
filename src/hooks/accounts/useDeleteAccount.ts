import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export function useDeleteAccount() {
  const toast = useToast();
  return useMutation(async (accountId: number) => {
    return await api.delete(`v1/accounts/${accountId}`);
  }, {
    onSuccess: async () => {
      toast({
        title: "Conta Excluída com Sucesso!",
        description: "Conta excluída com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await queryClient.invalidateQueries(['accounts'])
      await queryClient.invalidateQueries(['accounts-archived'])
    }, onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  });
}
