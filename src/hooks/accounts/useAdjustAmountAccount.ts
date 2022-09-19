import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";

export type updateAccountAmountFormData = {
  accountId: number;
  amount: number;
  type: string
}

type ErrorType = {
  title: string;
  details: string;
}

export function useAdjustAmountAccount(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast();

  return useMutation(async (account: updateAccountAmountFormData) => {
    const response = await api.patch('v1/accounts/readjustment', {
      ...account
    })

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['accounts'])
      onSuccess?.()
    }, onError: (error: AxiosError<ErrorType>) => {
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
