import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { UploadFile, UploadFilePresign } from "../users/type";

type ErrorType = {
  title: string;
  details: string;
}

const errorHint = {
  'Permission Denied!': "Permissão negada.",
  'Transaction not found': "Transação não encontrada.",
}

export function useUploadReceipt(transactionId: number, onSuccess?: (data: UploadFilePresign) => void, onError?: () => void) {
  const toast = useToast()

  return useMutation(async (uploadFile: UploadFile) => {
    const response = await api.post<UploadFilePresign>(`v1/transactions/${transactionId}/receipt`, {
      ...uploadFile
    });

    return response.data;
  }, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(['transactions']);
      await queryClient.invalidateQueries(['transaction', transactionId]);
      onSuccess?.(data);
    },
    onError: (error: AxiosError<ErrorType>) => {
      onError?.();

      toast({
        title: error.response?.data?.title ? errorHint[error.response.data.title] || "Erro ao fazer upload do comprovante" : "Erro ao fazer upload do comprovante",
        description: error.response?.data?.details ? errorHint[error.response.data.details] || "Ocorreu um erro ao fazer o upload do comprovante." : "Ocorreu um erro ao fazer o upload do comprovante.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  });
} 