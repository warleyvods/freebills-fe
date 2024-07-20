import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { CCTransaction } from "./type";
import { QueryKeys } from "../queryKeys";


type ErrorType = {
  title: string;
  details: string;
}

export function useCreateCCTransaction(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (ccTransaction: CCTransaction) => {
    ccTransaction.date = ccTransaction.date.replace(/\D/g, '-')
    const response = await api.post('v1/cc-transaction', {
      ...ccTransaction
    })

    return response.data;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CC_TRANSACTIONS])
      onSuccess?.()
      toast({
        description: "Transação criada com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
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
