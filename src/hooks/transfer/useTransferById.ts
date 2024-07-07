import { api } from "../../services/api";
import { useQuery } from "react-query";
import { formatDate } from "../../utils/chartData";
import { Transfer } from "./type";

async function getTransferById(transferId: number): Promise<Transfer> {
  const response = await api.get<Transfer>(`v1/transfer/${transferId}`)
  return response.data;
}

export function useTransferById(transferId: number) {
  return useQuery(
    ['transfer', transferId],
    async () => getTransferById(transferId), { enabled: transferId != undefined }
  )
}
