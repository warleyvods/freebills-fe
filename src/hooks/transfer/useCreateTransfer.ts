import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { Transfer } from "./type";

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateTransfer(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (transfer: Transfer) => {
    transfer.date = transfer.date.replace(/\D/g, '-')
    const response = await api.post('v1/transfer', {
      ...transfer
    });

    return response.data.transaction;
  }, {
    onSuccess: async () => {
      onSuccess?.();
      queryClient.invalidateQueries(['transfer']);

      toast({
        title: "Transfer criado com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
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
  })
}
