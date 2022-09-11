import { api } from "../../services/api";
import { useQuery } from "react-query";

type Account = {
  id: number;
  amount: number;
  description: string;
  accountType: string;
  dashboard: boolean;
  bankType: string;
}

async function getAccountById(accountId: number): Promise<Account> {
  const response = await api.get<Account>(`v1/accounts/${accountId}`)
  return response.data;
}

export function useAccountById(accountId: number) {
  return useQuery(['account', accountId], async () => getAccountById(accountId), { enabled: accountId != undefined })
}
