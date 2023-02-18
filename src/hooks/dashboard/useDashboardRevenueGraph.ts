import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type DashboardRevenueGraph = {
  labels: string[];
  series: number[];
}

async function getDashboard(userId: number, month?: number, year?: number): Promise<DashboardRevenueGraph> {
  const response = await api.get('v1/dashboard/revenue-graph', {
    params: {
      userId: userId,
      month,
      year
    }
  })
  return response.data;
}

export function useDashboardRevenueGraph(userId: number, month?: number, year?: number) {
  return useQuery(['balance-revenue-graph', userId, month, year],
    async () => getDashboard(userId, month, year));
}
