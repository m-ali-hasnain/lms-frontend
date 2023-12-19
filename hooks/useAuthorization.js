import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const useAuthorization = (expectedRole) => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("authDetails");
    if (!JSON.parse(user)?.authenticatedUser) {
      toast.error("Please login to continue");
      router.replace("/login");
    } else {
      const role = JSON.parse(user)?.authenticatedUser?.role;
      if (role !== expectedRole) {
        toast.error("You are not authorized to perform this action.");
        router.replace("/");
      }
    }
  }, []);
};
export default useAuthorization;
