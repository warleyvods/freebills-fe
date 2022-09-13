import { api } from "../../services/api";
import { useQuery } from "react-query";

type Transaction = {
  id: number;
  amount: number;
  paid: boolean;
  date: string,
  description: string;
  transactionType: string;
  transactionCategory: string;
}

async function getTransactionById(transactionId: number): Promise<Transaction> {
  const response = await api.get<Transaction>(`v1/transactions/${transactionId}`)
  return response.data;
}

export function useTransactionById(transactionId: number) {
  return useQuery(['transaction', transactionId], async () => getTransactionById(transactionId), { enabled: transactionId != undefined })
}
