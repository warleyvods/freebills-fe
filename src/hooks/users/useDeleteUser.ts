import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";

export function useDeleteUser() {
  const toast = useToast();
  return useMutation(async (userId: number) => {
    const response = await api.delete(`v1/user/${userId}`)
    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
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
