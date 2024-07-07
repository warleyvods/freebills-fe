import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export function useDeleteTransfer() {
  const toast = useToast();
  return useMutation(async (transferId: number) => {
    return await api.delete(`v1/transfer/${transferId}`);
  }, {
    onSuccess: async () => {
      toast({
        title: "Transfer Excluído com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
      await queryClient.invalidateQueries(['transfer'])
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
