import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export function useDeleteCard() {
  const toast = useToast();
  return useMutation(async (cardId: number) => {
    return await api.delete(`v1/cards/${cardId}`);
  }, {
    onSuccess: async () => {
      toast({
        title: "Cartão Excluído com Sucesso!",
        description: "Cartão excluído com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      await queryClient.invalidateQueries(['credit-cards'])
      await queryClient.invalidateQueries(['credit-cards-archived'])
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
