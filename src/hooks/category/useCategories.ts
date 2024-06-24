import { useQuery } from "react-query";
import { api } from "../../services/api";
import { Category } from "./type";


export type CategoryResponse = {
  totalElements: number;
  content: Category[];
}

async function getCategory(page: number, sort?: string, categoryType?: string, keyword?: string, size?: number): Promise<CategoryResponse> {
  const response = await api.get('v1/categories', {
    params: {
      page: page,
      size: size,
      sort: sort,
      categoryType: categoryType,
      keyword: keyword
    }
  });

  return response.data;
}

export function useCategories(page?: number, size?: number, sort?: string, categoryType?: string, keyword?: string) {
  return useQuery(['category', page, sort, categoryType, keyword, size], () => getCategory(page, sort, categoryType, keyword, size), {
    staleTime: 5000,
  })
}
