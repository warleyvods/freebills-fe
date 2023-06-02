import { api } from "../../services/api";
import { useQuery } from "react-query";
import { formatDate } from "../../utils/chartData";

type TransactionType = {
  id: number;
  amount: number;
  paid: boolean;
  date: string,
  description: string;
  transactionType: string;
  transactionCategory: string;
  bankSlip: boolean;
  barCode: string;
}

type getTransactionResponse = {
  totalElements: number;
  content: TransactionType[];
}

export async function getAllTransactions(page: number, keyword: string, month: string, year: string, userId?: number): Promise<getTransactionResponse> {
  const size = 8;
  const response = await api.get('v1/transactions/filter', {
    params: {
      page,
      userId: userId,
      size,
      keyword,
      month,
      year
    }
  });

  return {
    ...response.data,
    date: formatDate(response.data.date)
  };
}

export function useTransaction(page: number, keyword, month, year, userId?: number) {
  return useQuery(['transaction', userId, page, keyword, month, year], () => getAllTransactions(page, keyword, month, year, userId), {
    staleTime: 0,
    cacheTime: 0
  })
}
