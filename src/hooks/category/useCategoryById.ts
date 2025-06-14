import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Category } from "./type";

async function getCategoryById(categoryId: number): Promise<Category> {
  const response = await api.get<Category>(`v1/categories/${categoryId}`)
  return response.data
}

export function useCategoryById(categoryId: number) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => getCategoryById(categoryId),
    enabled: Number.isFinite(categoryId)
  });
}
