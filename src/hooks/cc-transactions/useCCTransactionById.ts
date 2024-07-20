import { api } from "../../services/api";
import { useQuery } from "react-query";
import { formatDate } from "../../utils/chartData";
import { QueryKeys } from "../queryKeys";
import { CCTransaction } from "./type";


async function getCCTransactionById(cctId: number): Promise<CCTransaction> {
  const response = await api.get<CCTransaction>(`v1/cc-transaction/transaction/${cctId}`)

  const data = response.data;
  return {
    id: data.id,
    date: formatDate(data.date),
    amount: data.amount,
    description: data.description,
    categoryId: data.categoryId,
    creditCardId: data.creditCardId,
    expirationDate: data.expirationDate
  }
}

export function useCCTransactionById(transactionId: number) {
  return useQuery([QueryKeys.CC_TRANSACTIONS, transactionId], async () => getCCTransactionById(transactionId), {
    enabled: Number.isFinite(transactionId)
  })
}
