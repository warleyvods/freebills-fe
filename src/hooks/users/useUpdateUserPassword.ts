import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export type updatePasswordUserFormData = {
  id: number;
  password: string;
  password_confirmation: string;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateUserPassword(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (password: updatePasswordUserFormData) => {
    await api.patch('v1/user', {
      ...password
    })

    return null;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
      onSuccess?.()
    }, onError: (error: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: error.response.data.title,
        description: error.response.data.details,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  });
}
