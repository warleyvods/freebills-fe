import { useQuery } from "react-query";
import { api } from "../../services/api";

type User = {
  id: number;
  name: string;
  login: string;
  email: string;
  admin: boolean;
  active: boolean;
  createdAt: string;
}

type getUsersResponse = {
  totalElements: number;
  content: User[];
}

export async function getUsers(page: number): Promise<getUsersResponse> {
  const size = 7;
  const response = await api.get('v1/user', {
      params: {
        page,
        size
      }
    })

    const totalElements = response.data.totalElements

    const content = response.data.content.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        active: user.active,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      };
    });

    return {
      content, totalElements
    };
}

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 5,
  })
}
