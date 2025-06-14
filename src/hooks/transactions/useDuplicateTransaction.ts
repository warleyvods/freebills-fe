import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
// Middleware import removed - not needed for this hook

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

  return useMutation({
    mutationFn: async (transactionId: number) => {
      const response = await api.put('v1/transactions/duplicate', {}, {
        params: {
          id: transactionId
        }
      });

      return response.data.transaction;
    },
    onSuccess: async () => {
      toast({
        title: "Transação!",
        description: "Transação duplicada com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })

      queryClient.invalidateQueries({ queryKey: ['balance-expense'] })
      queryClient.invalidateQueries({ queryKey: ['balance-revenue'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-expense'] })
      queryClient.invalidateQueries({ queryKey: ['transaction-revenue'] })
      queryClient.invalidateQueries({ queryKey: ['transaction'] })
      queryClient.invalidateQueries({ queryKey: ['balance'] })
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
        position: 'top'
      })
    }
  })
}
