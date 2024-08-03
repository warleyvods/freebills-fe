import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { UploadFile, UploadFilePresign } from "./type";

type ErrorType = {
  title: string;
  details: string;
}

const errorHint = {
  'Permission Denied!': "Permissão negada.",
  'You cannot change any developer attributes': "Você não pode alterar nenhum atributo da conta do desenvolvedor!",
}

export function useUploadImageFile(onSuccess?: (data: UploadFilePresign) => void, onError?: () => void) {
  const toast = useToast()

  return useMutation(async (uploadFile: UploadFile) => {
    const response = await api.patch<UploadFilePresign>('v1/user/add-image', {
      ...uploadFile
    });

    return response.data;
  }, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(['users']);
      await queryClient.invalidateQueries(['me']);
      onSuccess?.(data);
    },
    onError: (error: AxiosError<ErrorType>) => {
      onError?.();

      toast({
        title: errorHint[error.response.data.title],
        description: errorHint[error.response.data.details],
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  });
}
