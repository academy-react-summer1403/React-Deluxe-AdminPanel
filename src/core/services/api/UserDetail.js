import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useUserDetail = (id) => {
  const UserDetail = async () => {
    try {
      const res = await http.get(`/User/UserDetails/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["UserDetail", id],
    queryFn: UserDetail,
  });
};
