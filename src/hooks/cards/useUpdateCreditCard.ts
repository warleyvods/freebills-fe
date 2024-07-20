import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { QueryKeys } from "../queryKeys";

export type creditCardFormData = {
  accountId: number;
  cardLimit: number;
  description: string;
  cardFlag: string;
  expirationDay: boolean;
  closingDay: string;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateCreditCard(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast();

  return useMutation(async (cc: creditCardFormData) => {
    const response = await api.put('v1/cards', {
      ...cc
    })

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CREDIT_CARDS])
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
