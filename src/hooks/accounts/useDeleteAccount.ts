import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { QueryKeys } from "../queryKeys";

export function useDeleteAccount() {
  const toast = useToast();
  return useMutation(async (accountId: number) => {
    return api.delete(`v1/accounts/${accountId}`);
  }, {
    onSuccess: async () => {
      toast({
        description: "Conta excluída com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
      await queryClient.invalidateQueries([QueryKeys.ACCOUNTS])
      await queryClient.invalidateQueries(['accounts-archived'])
    }, onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
    }
  });
}
