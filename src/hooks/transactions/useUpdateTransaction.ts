import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";

export type updateTransaction = {
  id: number
  accountId: number,
  amount: string,
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

export function useUpdateTransaction(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (transaction: updateTransaction) => {
    transaction.date = transaction.date.replace(/\D/g, '-')
    const response = await api.put('v1/transactions', {
      ...transaction
    })

    return response.data.transaction;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['balance-expense'])
      await queryClient.invalidateQueries(['balance-revenue'])
      await queryClient.invalidateQueries(['transaction-expense'])
      await queryClient.invalidateQueries(['transaction-revenue'])
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