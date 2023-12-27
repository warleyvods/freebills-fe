import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export type updateArchiveAccount = {
  id: number;
  archived: boolean;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateArchiveAccount(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (updateArchiveAccount: updateArchiveAccount) => {
    await api.patch('v1/accounts', {
      ...updateArchiveAccount
    })

    return null;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['accounts'])
      await queryClient.invalidateQueries(['accounts-archived'])
      toast({
        description: "Ação executada com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top"
      })
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
