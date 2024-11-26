import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useUserList = (search, role, active, PageNumber, RowsOfPage) => {
  const UsersList = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      if (role !== "" && role !== null) query.roleId = role;

      if (active !== "" && active !== null) query.IsActiveUser = active;

      if (PageNumber !== "" && PageNumber !== null)
        query.PageNumber = PageNumber;

      if (RowsOfPage !== "" && RowsOfPage !== null)
        query.RowsOfPage = RowsOfPage;

      const result = await http.get("/User/UserMannage", { params: query });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["UserList", search, role, active, PageNumber, RowsOfPage],

    queryFn: UsersList,
  });
};
