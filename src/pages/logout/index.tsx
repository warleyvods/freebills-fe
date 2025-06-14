import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "../../services/api";

export const Logout = () => {
  const router = useRouter();

  useQuery({
    queryKey: ['logout'],
    queryFn: async () => {
      await api.post('v1/auth/logout')
      router.push("/");
    }
  })

  return null
}

export default Logout;
