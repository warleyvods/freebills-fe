import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateArchiveSubcategory(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();

  return useMutation(
    async (subcategoryId: number) => {
      const response = await api.patch(`v1/subcategories/${subcategoryId}`);
      return response.data;
    }, 
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['subcategory']);
        onSuccess?.();
        toast({
          description: "Status da subcategoria alterado com sucesso!",
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
          description: error.response?.data?.details || "Ocorreu um erro ao alterar o status da subcategoria",
          status: 'error',
          duration: 2000,
          isClosable: true,
          position: 'top'
        });
      }
    }
  );
} 