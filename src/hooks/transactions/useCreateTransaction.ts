import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
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
  return useMutation(async (transaction: Transaction) => {
    transaction.date = transaction.date.replace(/\D/g, '-')
    const response = await api.post('v1/transactions', {
      ...transaction
    });

    return response.data.transaction;
  }, {
    onSuccess: async () => {
      toast({
        description: "Transação criada com sucesso.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })

      queryClient.invalidateQueries(['balance-expense'])
      queryClient.invalidateQueries(['balance-revenue'])
      queryClient.invalidateQueries(['transaction-expense'])
      queryClient.invalidateQueries(['transaction-revenue'])
      queryClient.invalidateQueries(['transaction'])
      queryClient.invalidateQueries(['balance'])
      onSuccess?.()
    }, onError: (error: AxiosError<ErrorType>) => {
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
