import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { QueryKeys } from "../queryKeys";
import { Account } from "./type";

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('v1/accounts');
  return response.data;
}

export function useAccounts() {
  return useQuery({
    queryKey: [QueryKeys.ACCOUNTS],
    queryFn: () => getAccounts(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60
  })
}
