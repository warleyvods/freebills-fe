import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";

type User = {
  id: number;
  name: string;
  login: string;
  email: string;
  admin: boolean;
  active: boolean;
  createdAt: string;
}

export async function getMe(): Promise<User> {
  const response = await api.get('v1/me')
  return response.data;
}

export function useMe() {
  const router = useRouter();
  return useQuery(['me'], async () => getMe(), {
    onError: () => {
      router.push("/logout")
    },
    enabled: router.pathname !== '/',
    retry: false
  });
}
