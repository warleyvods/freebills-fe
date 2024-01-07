import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";

export function useDeleteBatchUsers(onSuccess?: () => void, onError?: () => void) {
  const toast = useToast();
  return useMutation(async (productsIds: number[]) => {
    const params = productsIds.join(',');
    const response = await api.delete(`v1/user?ids=${params}`);
    return response.data;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users']);
      onSuccess?.();
      toast({
        description: 'Usuários excluídos!',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
    },
    onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      onError?.();
    },
  });
}

