import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { config } from "../../pages/_middleware";

export type createTransactionData = {
  accountId: number,
  amount: string,
  date: string,
  paid: boolean,
  description: string,
  transactionType: string,
  transactionCategory: string,
  barCode: string,
  bankSlip: boolean
}

type ErrorType = {
  title: string;
  details: string;
}

export function useDuplicateTransaction(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (transactionId: number) => {
    const response = await api.put('v1/transactions/duplicate', {}, {
      params: {
        id: transactionId
      }
    });

    return response.data.transaction;
  }, {
    onSuccess: async () => {
      toast({
        title: "Transação!",
        description: "Transação duplicada com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })

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
        position: 'top'
      })
    }
  })
}
