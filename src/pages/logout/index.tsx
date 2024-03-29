import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import { api } from "../../services/api";

export const Logout = () => {
  const router = useRouter();

  useQuery(['logout'], async () => {
    await api.post('v1/auth/logout')
    router.push("/");
  })

  return null
}

export default Logout;
