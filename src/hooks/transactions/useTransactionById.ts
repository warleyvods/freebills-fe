import { api } from "../../services/api";
import { useQuery } from "react-query";
import { formatDate } from "../../utils/chartData";

export type Transaction = {
  id: number;
  amount: number;
  paid: boolean;
  date: string,
  description: string;
  transactionType: string;
  categoryId: number;
  transactionCategory: string;
  bankSlip: boolean;
  barCode: string;
  accountId: number;
}

async function getTransactionById(transactionId: number): Promise<Transaction> {
  const response = await api.get<Transaction>(`v1/transactions/${transactionId}`)

  const data = response.data;
  return {
    id: data.id,
    amount: data.amount,
    paid: data.paid,
    date: formatDate(data.date),
    description: data.description,
    transactionType: data.transactionType,
    transactionCategory: data.transactionCategory,
    bankSlip: data.bankSlip,
    barCode: data.barCode,
    accountId: data.accountId,
    categoryId: data.categoryId
  }
}

export function useTransactionById(transactionId: number) {
  return useQuery(['transaction', transactionId], async () => getTransactionById(transactionId), { enabled: transactionId != undefined })
}
