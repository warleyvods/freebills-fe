import { api } from "../../services/api";
import { useQuery } from "react-query";
import { formatDate } from "../../utils/chartData";

export type TransactionMetadata = {
  id: number;
  hasReceipt: boolean;
  hasPaidConfirmation: boolean;
  hasObservation: boolean;
  isRecurring: boolean;
  isFixed: boolean;
  isCreditCardPayment: boolean;
  isBankSlip: boolean;
  tags: string;
  isFavorite: boolean;
}

export type Transaction = {
  id: number;
  amount: number;
  date: string,
  description: string;
  transactionType: string;
  categoryId: number;
  transactionCategory: string;
  barCode: string;
  accountId: number;
  observation: string;
  receiptId?: string;
  metadata?: TransactionMetadata;
}

async function getTransactionById(transactionId: number): Promise<Transaction> {
  const response = await api.get<Transaction>(`v1/transactions/${transactionId}`)

  const data = response.data;
  return {
    id: data.id,
    amount: data.amount,
    date: formatDate(data.date),
    description: data.description,
    transactionType: data.transactionType,
    transactionCategory: data.transactionCategory,
    barCode: data.barCode,
    accountId: data.accountId,
    categoryId: data.categoryId,
    observation: data.observation,
    receiptId: data.receiptId,
    metadata: data.metadata
  }
}

export function useTransactionById(transactionId: number) {
  return useQuery(['transaction', transactionId], async () => getTransactionById(transactionId), { enabled: transactionId != undefined })
}
