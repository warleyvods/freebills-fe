import { useQuery } from "react-query";
import { api } from "../../services/api";

export type DashboardBalanceExpense = {
  totalBalance: number;
  totalExpensePending: number;
  totalExpenseReceived: number;
  totalExpense: number;
}

export async function getDashboardExpense(month: number, year: number): Promise<DashboardBalanceExpense> {
  const response = await api.get('v1/dashboard/expense', {
    params: {
      month,
      year
    }
  })
  return response.data;
}

export function useDashboardExpense(month: number, year: number) {
  return useQuery(['balance-expense', month, year], async () => getDashboardExpense(month, year));
}
