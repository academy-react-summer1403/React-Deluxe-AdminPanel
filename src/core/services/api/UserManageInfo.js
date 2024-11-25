import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useUserManageInfo = (roleId) => {
  const UserManageInfo = async () => {
    try {
      const query = {};
      if (roleId !== "" && roleId !== null) query.roleId = roleId;

      const res = await http.get(`/User/UserMannage`, { params: query });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["UserDetail", roleId],
    queryFn: UserManageInfo,
  });
};
