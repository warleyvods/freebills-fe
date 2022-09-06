import { api } from "../../services/api";
import { useQuery } from "react-query";

type TransactionType = {
  id: number;
  amount: number;
  paid: boolean;
  date: string,
  description: string;
  transactionType: string;
  transactionCategory: string;
}

type getTransactionResponse = {
  totalElements: number;
  content: TransactionType[];
}

export async function getAllTransactions(userId: number, page: number, keyword: string): Promise<getTransactionResponse> {
  const size = 8;
  const response = await api.get('v1/transactions/filter', {
    params: {
      page,
      userId: userId,
      size,
      keyword
    }
  });

  return response.data;
}

export function useTransaction(userId: number, page: number, keyword) {
  return useQuery(['transaction', userId, page, keyword], () => getAllTransactions(userId, page, keyword), {
    staleTime: 0,
    cacheTime: 0
  })
}
