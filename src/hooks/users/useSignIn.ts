import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

export type createUserFormData = {
  name: string;
  login: string
  email: string;
  password: string;
  password_confirmation: string;
}

type ErrorType = {
  title: string;
  details: string;
}

export function useSignIn(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (user: createUserFormData) => {
    const response = await api.post('/v1/auth/signup', {
      ...user
    })

    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user'])
      onSuccess?.()
    }, onError: (erro: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: erro.response.data.title,
        description: erro.response.data.details,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  });
}
