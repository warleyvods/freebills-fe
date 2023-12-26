import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

export type DashboardBalance = {
  type: string;
  totalBalance: number;
  totalRevenue: number;
  totalExpensive: number;
  totalExpensiveCards: number;
}

export async function getDashboard(month: number, year: number): Promise<DashboardBalance> {
  const response = await api.get('v1/dashboard/total', {
    params: {
      month,
      year
    }
  })
  return response.data;
}

export function useDashboard(month: number, year: number) {
  return useQuery(['balance', month, year], async () => getDashboard(month, year));
}
