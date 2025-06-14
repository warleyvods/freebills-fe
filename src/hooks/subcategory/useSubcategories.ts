import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Subcategory } from "./type";
import { QueryKeys } from "../queryKeys";

export interface SubcategoryResponse {
  content: Subcategory[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

async function getSubcategories(
  page: number,
  size: number,
  sort: string,
  type?: string,
  keyword?: string,
  archived?: boolean
): Promise<SubcategoryResponse> {
  const params = {
    page,
    size,
    sort,
    type,
    keyword,
    archived
  };
  
  const response = await api.get<SubcategoryResponse>('v1/subcategories', { params });
  return response.data;
}

export function useSubcategories(
  page = 0,
  size = 10,
  sort = "name,asc",
  type?: string,
  keyword?: string,
  archived = false
) {
  return useQuery({
    queryKey: [QueryKeys.SUBCATEGORY, page, size, sort, type, keyword, archived],
    queryFn: () => getSubcategories(page, size, sort, type, keyword, archived),
    
      staleTime: 1000 * 60,
    
  });
} 