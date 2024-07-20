import { api } from "../../services/api";
import { useQuery } from "react-query";
import { CCTransaction } from "./type";
import { QueryKeys } from "../queryKeys";

export type CCTransactionResponse = {
  totalElements: number;
  content: CCTransaction[];
}

async function getCCTransaction(id: number, page: number, sort?: string, keyword?: string, size?: number, month?: number, year?: number): Promise<CCTransactionResponse> {
  const response = await api.get(`v1/cc-transaction/card/${id}`, {
    params: {
      page: page,
      size: size,
      sort: sort,
      month: month,
      year: year,
      keyword: keyword,
    }
  });

  return response.data;
}

export function useCCTransactions(id: number, page?: number, size?: number, sort?: string, keyword?: string, year?: number, month?: number) {
  return useQuery(
    [QueryKeys.CC_TRANSACTIONS, id, page, sort, size, keyword, year, month],
    () => getCCTransaction(id, page, sort, keyword, size, month, year), {
      staleTime: 1000,
      enabled: Number.isFinite(id)
    })
}
