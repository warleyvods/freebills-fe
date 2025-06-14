import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Subcategory } from "./type";

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateSubcategory(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();

  return useMutation(
    async (subcategory: Subcategory) => {
      const response = await api.post('v1/subcategories', {
        ...subcategory,
        archived: false
      });
      return response.data;
    }, 
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['subcategory']);
        onSuccess?.();
        toast({
          description: "Nova subcategoria criada com sucesso!",
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
          description: error.response?.data?.details || "Ocorreu um erro ao criar a subcategoria",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      }
    }
  );
} 