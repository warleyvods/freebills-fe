import { api } from "../../services/api";
import { useQuery } from "react-query";

type CreditCard = {
  id: number;
  accountId: number;
  cardLimit: number;
  description: string;
  cardFlag: string;
  expirationDay: boolean;
  closingDay: string;
}

async function getAccountById(creditCardId: number): Promise<CreditCard> {
  const response = await api.get<CreditCard>(`v1/accounts/${creditCardId}`)
  return response.data;
}

export function useCreditCardById(creditCardId: number) {
  return useQuery(['credit-card', creditCardId], async () => getAccountById(creditCardId), { enabled: creditCardId != undefined })
}
