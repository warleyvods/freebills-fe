import { useEffect } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { api } from "../../services/api";

const Logout = () => {
  const router = useRouter();
  const { mutateAsync: logout } = useMutation(async () => {
    await api.post("v1/auth/logout");
  });

  useEffect(() => {
    (async () => {
      await logout();
      await router.push("/");
    })();
  }, [logout, router]);

  return null;
};

export default Logout;
