import { useQuery } from "react-query";
import { api } from "../../services/api";
import { Transfer } from "./type";


export type TransferResponse = {
  totalElements: number;
  content: Transfer[];
}

async function getTransfer(
  page: number,
  size?: number,
  sort?: string,
  month?: number,
  year?: number
): Promise<TransferResponse> {
  const response = await api.get('v1/transfer', {
    params: {
      page: page,
      size: size,
      sort: sort,
      month: month,
      year: year
    }
  });

  return response.data;
}

export function useTransfer(
  page: number,
  size?: number,
  sort?: string,
  month?: number,
  year?: number
) {
  return useQuery(
    ['transfer', page, size, sort, month, year],
    () => getTransfer(page, size, sort, month, year), {
      staleTime: 1000,
    });
}
