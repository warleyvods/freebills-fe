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
  lastAccess: string;
}

type getUsersResponse = {
  totalElements: number;
  content: User[];
}

async function getUsers(page, sort?, status?, keyword?, size?): Promise<getUsersResponse> {
  const response = await api.get('v1/user', {
    params: {
      page: page,
      size: size,
      sort: sort,
      status: status,
      keyword: keyword
    }
  });

  const totalElements = response.data.totalElements;

  const content = response.data.content.map(user => {
    const createdAt = user.createdAt && isValidDate(user.createdAt)
      ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      : "-";

    const lastAccess = user.lastAccess && isValidDate(user.lastAccess)
      ? new Date(user.lastAccess).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
      : "-";

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      active: user.active,
      createdAt,
      lastAccess
    };
  });

  return {
    content,
    totalElements
  };
}

function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
}

export function useUsers(page, sort?, status?, keyword?, size?) {
  return useQuery(['users', page, sort, status, keyword, size], () => getUsers(page, sort, status, keyword, size), {
    staleTime: 1000 * 5,
  })
}
