import { useQuery } from "react-query";
import { api } from "../../services/api";

export type ReceiptInfo = {
  downloadSignedUrl: string;
  publicUrl: string;
  fileType: string;
};

async function getReceiptDownloadUrl(transactionId: number): Promise<ReceiptInfo> {
  const response = await api.get<ReceiptInfo>(`v1/transactions/${transactionId}/receipt/download`);
  return response.data;
}

export function useGetReceiptDownloadUrl(transactionId: number) {
  return useQuery(
    ['transaction', transactionId, 'receipt', 'download'],
    () => getReceiptDownloadUrl(transactionId),
    {
      enabled: !!transactionId,
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000, // 5 minutos
      staleTime: 5 * 60 * 1000, // 5 minutos
    }
  );
} 