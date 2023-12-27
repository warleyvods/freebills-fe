import { useQuery } from "react-query";
import { api } from "../../services/api";

export type Account = {
  id: number;
  amount: number;
  description: string;
  accountType: string;
  dashboard: boolean;
  bankType: string;
}

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('v1/accounts', {});
  return response.data;
}

export function useAccounts() {
  return useQuery(['accounts'], () => getAccounts(), {
    staleTime: 0,
    cacheTime: 0,
  })
}
