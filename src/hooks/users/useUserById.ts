import { api } from "../../services/api";
import { useQuery } from "react-query";
import { User } from "./useUsers";

async function getUserById(userId: number): Promise<User> {
  const response = await api.get<User>(`v1/user/${userId}`)
  return response.data
}

export function useUserById(userId: number) {
  return useQuery(['user', userId], async () => getUserById(userId), {
    enabled: Number.isFinite(userId)
  });
}
