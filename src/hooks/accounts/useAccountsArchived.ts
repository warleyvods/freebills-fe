import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Account } from "./type";

export async function getAccounts(): Promise<Account[]> {
  const response = await api.get('v1/accounts/archived');
  return response.data;
};

export function useAccountArchived() {
  return useQuery({
    queryKey: ['accounts-archived'],
    queryFn: () => getAccounts(),
    
    staleTime: 0,
    gcTime: 0
  
  })
}
