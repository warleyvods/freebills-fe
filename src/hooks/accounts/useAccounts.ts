import { useQuery } from "react-query";
import { api } from "../../services/api";
import { QueryKeys } from "../queryKeys";
import { Account } from "./type";

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('v1/accounts');
  return response.data;
}

export function useAccounts() {
  return useQuery([QueryKeys.ACCOUNTS], () => getAccounts(), {
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60
  })
}
