import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

export type DashboardRevenueBalance = {
  totalBalance: number;
  totalRevenuePending: number;
  totalRevenueReceived: number;
  totalRevenue: number;
}

export async function getDashboardRevenue(month: number, year: number): Promise<DashboardRevenueBalance> {
  const response = await api.get('v1/dashboard/revenue', {
    params: {
      month,
      year
    }
  })
  return response.data;
}

export function useDashboardRevenue(month: number, year: number) {
  return useQuery(['balance-revenue', month, year], async () => getDashboardRevenue(month, year));
}
