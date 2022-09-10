import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type DashboardBalance = {
  totalBalance: number;
  totalRevenuePending: number;
  totalRevenueReceived: number;
  totalRevenue: number;
}

export async function getDashboardRevenue(userId: number, month?: number, year?: number): Promise<DashboardBalance> {
  const response = await api.get('v1/dashboard/revenue', {
    params: {
      userId: userId,
      month,
      year
    }
  })
  return response.data;
}

export function useDashboardRevenue(userId: number, month?: number, year?: number) {
  const router = useRouter();
  return useQuery(['balance-revenue', userId, month, year], async () => getDashboardRevenue(userId, month, year));
}
