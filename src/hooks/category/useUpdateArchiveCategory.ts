import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";

type ErrorType = {
  title: string;
  details: string;
}

export function useUpdateArchiveCategory(onSuccess?: () => {}, onError?: () => {}) {
  const toast = useToast()

  return useMutation(async (categoryId: number) => {
    await api.patch(`v1/categories/${categoryId}`)

    return null;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['category'])
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
