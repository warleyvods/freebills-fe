import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

type ErrorType = {
  title: string;
  details: string;
}

export function useDeleteSubcategory(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();

  return useMutation({
    mutationFn: async (subcategoryId: number) => {
      await api.delete(`v1/subcategories/${subcategoryId}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['subcategory'] });
      onSuccess?.();
      toast({
        description: "Subcategoria excluída com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    }, 
    onError: (error: AxiosError<ErrorType>) => {
      onError?.();
      toast({
        title: error.response?.data?.title || "Erro",
        description: error.response?.data?.details || "Ocorreu um erro ao excluir a subcategoria",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  });
} 