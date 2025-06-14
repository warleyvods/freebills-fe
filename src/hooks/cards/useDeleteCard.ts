import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { QueryKeys } from "../queryKeys";

export function useDeleteCard() {
  const toast = useToast();
  return useMutation({
    mutationFn: async (cardId: number) => {
      return await api.delete(`v1/credit-card/${cardId}`);
    },
    onSuccess: async () => {
      toast({
        description: "Cartão excluído com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.CREDIT_CARDS] })
    }, 
    onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  });
}
