import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../services/api";
import { queryClient } from "../services/queryClient";
import { AxiosError } from "axios";

type ErrorType = {
  title: string;
  details: string;
}

export function useDeleteUser() {
  const toast = useToast()
  return useMutation(async (userId: number) => {
    const response = await api.delete(`api/people/${userId}`)
    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user'])
    }, onError: (error: AxiosError<ErrorType>) => {
      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  });
}
