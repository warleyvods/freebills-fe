import { api } from "../../services/api";
import { useQuery } from "react-query";
import { Transaction } from "./useTransactionById";

type TransactionResponse = {
  totalElements: number;
  content: Transaction[];
}

export async function getAllTransactionsRevenue(
  page: number,
  keyword: string,
  month: number,
  year: number,
  userId?: number,
  size?: number,
  sort?: string,
  transactionType?: string): Promise<TransactionResponse> {

  const response = await api.get('v1/transactions/filter', {
    params: {
      userId,
      page,
      size,
      sort,
      month,
      year,
      keyword,
      transactionType,
    }
  });

  return response.data;
}

export function useTransactionRevenue(
  page: number,
  keyword: string,
  month: number,
  year: number,
  sort?: string,
  transactionType?: string,
  size?: number,
  userId?: number
) {
  return useQuery(
    ['transaction-revenue', userId, page, keyword, month, year, sort, transactionType, size],
    () => getAllTransactionsRevenue(page, keyword, month, year, userId, size, sort, transactionType),
    {
      staleTime: 0,
      cacheTime: 0
    }
  )
}
