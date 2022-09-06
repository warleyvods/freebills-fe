import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type DashboardBalance = {
  type: string;
  totalBalance: number;
  totalRevenue: number;
  totalExpensive: number;
  totalExpensiveCards: number;
}

export async function getDashboard(userId: number): Promise<DashboardBalance> {
  const response = await api.get('v1/dashboard', {
    params: {
      userId: userId
    }
  })
  return response.data;
}

export function useDashboard(userId: number) {
  const router = useRouter();
  return useQuery(['balance', userId], async () => getDashboard(userId));
}
