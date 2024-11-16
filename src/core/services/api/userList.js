import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useUserList = (search) => {
  const UsersList = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      const result = await http.get("/User/UserMannage", { params: query });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["UserList"],
    queryFn: UsersList,
  });
};
