import { api } from "../../services/api";
import { useQuery } from "react-query";
import { Transaction } from "./useTransactionById";
import { QueryKeys } from "../queryKeys";

type TransactionResponse = {
  totalElements: number;
  content: Transaction[];
  totalSurveyValues: number;
}

export async function getAllTransactionByCategory(category: string, transactionType: string, year: number, month: number): Promise<TransactionResponse> {
  const response = await api.get<TransactionResponse>('v1/transactions/category', {
    params: {
      month,
      year,
      category,
      transactionType,
    }
  });

  return response.data;
}

export function useTransactionByCategory(
  category: string,
  transactionType: string,
  year?: number,
  month?: number,
) {
  return useQuery(
    [QueryKeys.TRANSACTIONS_CATEGORY, category, transactionType, year, month],
    () => getAllTransactionByCategory(category, transactionType, year, month),
    {
      staleTime: 0,
      cacheTime: 0
    }
  )
}
