import { useQuery } from "react-query";
import { api } from "../services/api";

type User = {
  id: number;
  name: string;
  cpf: string;
  age: number;
}

export async function getUsers(): Promise<User[]> {
  const response = await api.get('/api/people')
  return response.data;
}

export function useUsers() {
  return useQuery(['user'], () => getUsers(), {
    staleTime: 1000 * 5,
  })
}
