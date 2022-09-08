import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";

export type createTransactionData = {
  accountId: number,
  amount: number,
  date: string,
  paid: boolean,
  description: string,
  transactionType: string,
  transactionCategory: string
}

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateTransaction(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (transaction: createTransactionData) => {
    const response = await api.post('v1/transactions', {
      ...transaction
    })

    return response.data.transaction;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['transaction'])
      await queryClient.invalidateQueries(['balance'])
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
  })
}
