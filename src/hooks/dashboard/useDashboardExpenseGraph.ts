import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type DashboardExpenseGraph = {
  labels: string[];
  series: number[];
  colors: string[]
}

async function getDashboard(userId: number, month?: number, year?: number): Promise<DashboardExpenseGraph> {
  const response = await api.get('v1/dashboard/expense-graph', {
    params: {
      userId,
      month,
      year
    }
  })
  return response.data;
}

export function useDashboardExpenseGraph(userId?: number, month?: number, year?: number) {
  return useQuery({
    queryKey: ['balance-expense-graph', userId, month, year],
    queryFn: async () => getDashboard(userId, month, year)
  });
}
