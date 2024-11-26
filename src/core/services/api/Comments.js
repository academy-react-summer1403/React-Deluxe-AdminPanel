import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useComments = (search, role, currentPage, rowsPerPage) => {
  const Comments = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      if (role !== "" && role !== null) query.Accept = role;
      if (currentPage !== "" && currentPage !== null)
        query.PageNumber = currentPage;
      if (rowsPerPage !== "" && rowsPerPage !== null)
        query.RowsOfPage = rowsPerPage;
      const result = await http.get("/Course/CommentManagment", {
        params: query,
      });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["Comments", search, role, currentPage, rowsPerPage],

    queryFn: Comments,
  });
};
