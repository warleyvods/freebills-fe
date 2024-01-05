import { api } from "../../services/api";
import { useQuery } from "react-query";
import { Transaction } from "./useTransactionById";

type TransactionResponse = {
  totalElements: number;
  content: Transaction[];
  totalSurveyValues: number;
}

export async function getAllTransactions(
  page: number,
  keyword: string,
  month: number,
  year: number,
  size?: number,
  sort?: string,
  transactionType?: string): Promise<TransactionResponse> {

  const response = await api.get<TransactionResponse>('v1/transactions/filter', {
    params: {
      page,
      size,
      sort,
      month,
      year,
      keyword,
      transactionType,
    }
  });

  if (keyword.length !== 0 && transactionType != null) {
    const totalSurveyValues = response.data.content.reduce(
      (total, transaction) => total + transaction.amount, 0
    );

    return { ...response.data, totalSurveyValues };
  }

  return response.data;
}

export function useTransaction(
  page: number,
  keyword: string,
  month: number,
  year: number,
  sort?: string,
  transactionType?: string,
  size?: number,
) {
  return useQuery(
    ['transaction-revenue', page, keyword, month, year, sort, transactionType, size],
    () => getAllTransactions(page, keyword, month, year, size, sort, transactionType),
    {
      staleTime: 0,
      cacheTime: 0
    }
  )
}
