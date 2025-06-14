import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Subcategory } from "./type";

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateSubcategory(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();

  return useMutation({
    mutationFn: async (subcategory: Subcategory) => {
      const response = await api.put('v1/subcategories', {
        ...subcategory
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['subcategory'] });
      onSuccess?.();
      toast({
        description: "Subcategoria atualizada com sucesso!",
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
        description: error.response?.data?.details || "Ocorreu um erro ao atualizar a subcategoria",
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      });
    }
  });
} 