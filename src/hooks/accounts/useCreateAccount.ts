import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { QueryKeys } from "../queryKeys";

export type accountFormData = {
  userId: number;
  amount: number;
  description: string;
  accountType: string;
  dashboard: boolean;
  bankType: string;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateAccount(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast();

  return useMutation({
    mutationFn: async (account: accountFormData) => {
      const response = await api.post('v1/accounts', {
        ...account
      })

      return response.data.user;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.ACCOUNTS] })
      onSuccess?.()
    }, 
    onError: (error: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  });
}
