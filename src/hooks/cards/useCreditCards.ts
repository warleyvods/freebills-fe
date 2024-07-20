import { useQuery } from "react-query";
import { api } from "../../services/api";
import { QueryKeys } from "../queryKeys";
import { CreditCard } from "./type";

export async function getCreditCards({archived}: {archived: boolean}): Promise<CreditCard[]> {
  const response = await api.get('v1/credit-card', {
    params: {
      archived: archived
    }
  });
  return response.data;
}

export function useCreditCards(archived: boolean) {
  return useQuery([QueryKeys.CREDIT_CARDS], () => getCreditCards({archived}), {
    staleTime: 0,
    cacheTime: 0
  })
}
