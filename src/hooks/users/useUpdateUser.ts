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
  admin: boolean;
  active: boolean;
}

type ErrorType = {
  title: string;
  details: string;
}

const errorHint = {
  'Permission Denied!': "Permissão negada.",
  'You cannot change any developer attributes': "Você não pode alterar nenhum atributo da conta do desenvolvedor!",
}

export function useUpdateUser(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (user: createUserFormData) => {
      const response = await api.put('v1/user', {
        ...user
      })
      return response.data.user;
  }, {
    onSuccess: async () => {
      toast({
        description: 'Atualizado com sucesso!',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top'
      })

      await queryClient.invalidateQueries(['users'])
      await queryClient.invalidateQueries(['me'])
      onSuccess?.()
    }, onError: (error: AxiosError<ErrorType>) => {
      onError?.()

      toast({
        title: errorHint[error.response.data.title],
        description: errorHint[error.response.data.details],
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  });
}
