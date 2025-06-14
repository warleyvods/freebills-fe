import { useQuery } from "@tanstack/react-query";
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
  return useQuery({
    queryKey: [QueryKeys.CREDIT_CARDS],
    queryFn: () => getCreditCards({archived}),
    
    staleTime: 0,
    gcTime: 0
  
  })
}
