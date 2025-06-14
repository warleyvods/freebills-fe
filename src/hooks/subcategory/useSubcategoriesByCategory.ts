import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import { Subcategory } from "./type";
import { QueryKeys } from "../queryKeys";

interface SubcategoryResponse {
  content: Subcategory[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

async function getSubcategoriesByCategory(
  categoryId: number,
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
  
  const response = await api.get<SubcategoryResponse>(`v1/subcategories/category/${categoryId}`, { params });
  return response.data;
}

export function useSubcategoriesByCategory(
  categoryId: number,
  page = 0,
  size = 10,
  sort = "name,asc",
  type?: string,
  keyword?: string,
  archived = false
) {
  return useQuery({
    queryKey: [QueryKeys.SUBCATEGORY, 'by-category', categoryId, page, size, sort, type, keyword, archived],
    queryFn: () => getSubcategoriesByCategory(categoryId, page, size, sort, type, keyword, archived),
    
      staleTime: 1000 * 60, // 1 minuto
      enabled: Number.isFinite(categoryId) && categoryId > 0
    
  });
} 