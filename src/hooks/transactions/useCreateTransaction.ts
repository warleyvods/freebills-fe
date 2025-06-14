import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { Transaction } from "./type";

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateTransaction(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()
  return useMutation({
    mutationFn: async (transaction: Transaction) => {
      transaction.date = transaction.date.replace(/\D/g, '-')
      const response = await api.post('v1/transactions', {
        ...transaction
      });

      return response.data.transaction;
    },
    onSuccess: async () => {
      toast({
        description: "Transação criada com sucesso.",
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
        duration: 2000,
        isClosable: true,
      })
    }
  })
}
