import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Account } from "./type";
import { QueryKeys } from "../queryKeys";

async function getAccountById(accountId: number): Promise<Account> {
  const response = await api.get<Account>(`v1/accounts/${accountId}`)
  return response.data;
}

export function useAccountById(accountId: number) {
  return useQuery({
    queryKey: [QueryKeys.ACCOUNTS, accountId],
    queryFn: async () => getAccountById(accountId),
    enabled: Number.isFinite(accountId)
  });
}
