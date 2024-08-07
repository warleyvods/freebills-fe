import { useQuery } from "react-query";
import { api } from "../../services/api";
import { Account } from "./type";

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('v1/accounts/archived');
  return response.data;
};

export function useAccountArchived() {
  return useQuery(['accounts-archived'], () => getAccounts(), {
    staleTime: 0,
    cacheTime: 0
  })
}
