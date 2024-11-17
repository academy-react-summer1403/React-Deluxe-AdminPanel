import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useUserList = (search, role) => {
  const UsersList = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      if (role !== "" && role !== null) query.roleId = role;

      const result = await http.get("/User/UserMannage", { params: query });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["UserList", search, role],

    queryFn: UsersList,
  });
};
