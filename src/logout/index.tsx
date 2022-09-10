import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { api } from "../services/api";

export const Logout = () => {
  const router = useRouter();

  useQuery(['logout'], async () => {
    await api.get('v1/logout')
    router.push("/");
  })

  return null
}

export default Logout;
