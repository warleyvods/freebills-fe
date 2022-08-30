import { useQuery } from "react-query";
import { api } from "../../services/api";

type Account = {
  id: number;
  amount: number;
  description: string;
  accountType: string;
  dashboard: boolean;
  bankType: string;
}

export async function getAccounts(userId: number): Promise<Account[]> {
  const response = await api.get('v1/accounts', {
    params: {
      userId: userId
    }
  });

  return response.data;
}

export function useAccounts(userId: number) {
  return useQuery(['accounts', userId], () => getAccounts(userId), {
    staleTime: 0,
    cacheTime: 0
  })
}
