import { api } from "../../services/api";
import { useQuery } from "react-query";

export type Transaction = {
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

async function getTransactionById(transactionId: number): Promise<Transaction> {
  const response = await api.get<Transaction>(`v1/transactions/${transactionId}`)

  const dados = response.data;
  return {
    id: dados.id,
    amount: dados.amount,
    paid: dados.paid,
    date: dados.date,
    description: dados.description,
    transactionType: dados.transactionType,
    transactionCategory: dados.transactionCategory,
    bankSlip: dados.bankSlip,
    barCode: dados.barCode
  }
}

export function useTransactionById(transactionId: number) {
  return useQuery(['transaction', transactionId], async () => getTransactionById(transactionId), { enabled: transactionId != undefined })
}
