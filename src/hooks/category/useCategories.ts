import { useQuery } from "react-query";
import { api } from "../../services/api";
import { Category } from "./type";


export type CategoryResponse = {
  totalElements: number;
  content: Category[];
}

async function getCategory(page: number, sort?: string, categoryType?: string, keyword?: string, size?: number, archived?: boolean): Promise<CategoryResponse> {
  const response = await api.get('v1/categories', {
    params: {
      page: page,
      size: size,
      sort: sort,
      categoryType: categoryType,
      keyword: keyword,
      archived: archived
    }
  });

  return response.data;
}

export function useCategories(page?: number, size?: number, sort?: string, categoryType?: string, keyword?: string, archived?: boolean) {
  return useQuery(
    ['category', page, sort, size, categoryType, keyword, archived],
    () => getCategory(page, sort, categoryType, keyword, size, archived), {
    staleTime: 1000,
  })
}
