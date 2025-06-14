import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";

export function useDeleteUser() {
  const toast = useToast();
  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await api.delete(`v1/user/${userId}`)
      return response.data.user;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    }, 
    onError: (err: any) => {
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
