import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type DashboardBalanceExpense = {
  totalBalance: number;
  totalExpensePending: number;
  totalExpenseReceived: number;
  totalExpense: number;
}

export async function getDashboardExpense(userId: number, month?: number, year?: number): Promise<DashboardBalanceExpense> {
  const response = await api.get('v1/dashboard/expense', {
    params: {
      userId: userId,
      month,
      year
    }
  })
  return response.data;
}

export function useDashboardExpense(userId: number, month?: number, year?: number) {
  const router = useRouter();
  return useQuery(['balance-expense', userId, month, year], async () => getDashboardExpense(userId, month, year));
}
