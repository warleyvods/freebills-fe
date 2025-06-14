import { api } from "../../services/api";
import { useQuery } from "react-query";
import { Subcategory } from "./type";

async function getSubcategoryById(subcategoryId: number): Promise<Subcategory> {
  const response = await api.get<Subcategory>(`v1/subcategories/${subcategoryId}`);
  return response.data;
}

export function useSubcategoryById(subcategoryId: number) {
  return useQuery(
    ['subcategory', subcategoryId], 
    () => getSubcategoryById(subcategoryId), 
    {
      enabled: Number.isFinite(subcategoryId)
    }
  );
} 