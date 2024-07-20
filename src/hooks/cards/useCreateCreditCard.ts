import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { AxiosError } from "axios";
import { CreditCard } from "./type";
import { QueryKeys } from "../queryKeys";

type ErrorType = {
  title: string;
  details: string;
}

export function useCreateCreditCard(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast();

  return useMutation(async (cc: CreditCard) => {
    const response = await api.post('v1/credit-card', {
      ...cc
    });

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
        duration: 2000,
        isClosable: true,
      });
    }
  });
}
