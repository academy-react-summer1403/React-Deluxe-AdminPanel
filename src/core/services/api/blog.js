import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = (search, role, currentPage, rowsPerPage) => {
  const Blogs = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      // if (role !== "" && role !== null) query.roleId = role;

      if (currentPage !== "" && currentPage !== null)
        query.PageNumber = currentPage;
      if (rowsPerPage !== "" && rowsPerPage !== null)
        query.RowsOfPage = rowsPerPage;

      const result = await http.get("/News/AdminNewsFilterList", {
        params: query,
      });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["Blogs", search, role, currentPage, rowsPerPage],
    queryFn: Blogs,
  });
};
