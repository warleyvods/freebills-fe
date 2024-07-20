import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { QueryKeys } from "../queryKeys";

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateArchiveCC(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (creditCardId: number) => {
    await api.patch(`v1/credit-card/${creditCardId}`)

    return null;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QueryKeys.CREDIT_CARDS])
      onSuccess?.()

      toast({
        description: "Ação executada com sucesso!",
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
        position: "top"
      })
    }
  });
}
