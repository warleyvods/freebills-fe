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

export async function getAllTransactionsRevenue(page: number, keyword: string, month: string, year: string, userId?: number): Promise<getTransactionResponse> {
  const size = 8;
  const response = await api.get('v1/transactions/revenue', {
    params: {
      // page,
      userId: userId,
      // size,
      keyword,
      month,
      year
    }
  });

  return response.data;
}

export function useTransactionRevenue(page: number, keyword, month, year, userId?: number) {
  return useQuery(['transaction-revenue', userId, page, keyword, month, year], () => getAllTransactionsRevenue(page, keyword, month, year, userId), {
    staleTime: 0,
    cacheTime: 0
  })
}