import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useComments = (search, role) => {
  const Comments = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      if (role !== "" && role !== null) query.roleId = role;

      const result = await http.get("/Course/CommentManagment", { params: query });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["Comments", search, role],

    queryFn: Comments,
  });
};
