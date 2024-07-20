import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { QueryKeys } from "../queryKeys";

export type UpdateAccount = {
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

  return useMutation(async (account: UpdateAccount) => {
    const response = await api.patch('v1/accounts/readjustment', {
      ...account
    });

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.ACCOUNTS])
      onSuccess?.()
    }, onError: (error: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })
    }
  });
}
