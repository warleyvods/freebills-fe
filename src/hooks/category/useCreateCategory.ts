import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Category } from "./type";


type ErrorType = {
  title: string;
  details: string;
}

export function useCreateCategory(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (category: Category) => {
    const response = await api.post('v1/categories', {
      ...category
    })

    return response.data;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['category'])
      onSuccess?.()
      toast({
        description: "Nova categoria criada com sucesso!",
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
