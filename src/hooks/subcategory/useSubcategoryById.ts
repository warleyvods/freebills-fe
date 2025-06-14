import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { Subcategory } from "./type";

async function getSubcategoryById(subcategoryId: number): Promise<Subcategory> {
  const response = await api.get<Subcategory>(`v1/subcategories/${subcategoryId}`);
  return response.data;
}

export function useSubcategoryById(subcategoryId: number) {
  return useQuery({
    queryKey: ['subcategory', subcategoryId],
    queryFn: () => getSubcategoryById(subcategoryId),
    
      enabled: Number.isFinite(subcategoryId)
    
  });
} 