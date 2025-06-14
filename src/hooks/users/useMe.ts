import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

type User = {
  id: number;
  name: string;
  login: string;
  email: string;
  admin: boolean;
  imgUrl: string;
  active: boolean;
  createdAt: string;
}

export async function getMe(): Promise<User> {
  const response = await api.get('v1/me')
  return response.data;
}

export function useMe() {
  const router = useRouter();
  const query = useQuery({
    queryKey: ['me'],
    queryFn: async () => getMe(),
    enabled: router.pathname !== '/',
    retry: false
  });

  useEffect(() => {
    if (query.error) {
      router.push("/logout");
    }
  }, [query.error, router]);

  return query;
}
