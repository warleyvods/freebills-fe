import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export function useDeleteCategory() {
  const toast = useToast();
  return useMutation(async (categoryId: number) => {
    return await api.delete(`v1/categories/${categoryId}`);
  }, {
    onSuccess: async () => {
      toast({
        description: "Categoria deletada com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
      await queryClient.invalidateQueries(['category'])
    }, onError: (error: any) => {
      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
    }
  });
}
