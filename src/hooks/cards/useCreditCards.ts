import { useQuery } from "react-query";
import { api } from "../../services/api";

type CreditCard = {
  id: number;
  accountId: number;
  cardLimit: number;
  description: string;
  cardFlag: string;
  expirationDay: boolean;
  closingDay: string;
}

export async function getCards(): Promise<CreditCard[]> {
  const response = await api.get('v1/cards');
  return response.data;
}

export function useCreditCards() {
  return useQuery(['credit-cards'], () => getCards(), {
    staleTime: 0,
    cacheTime: 0
  })
}
