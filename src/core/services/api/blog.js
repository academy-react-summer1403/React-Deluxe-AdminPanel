import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = (search, currentPage, rowsPerPage, Role, Sorting) => {
  const Blogs = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      if (Role !== "" && Role !== null) query.SortingCol = Role;
      if (Sorting !== "" && Sorting !== null) query.SortType = Sorting;

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
    queryKey: ["Blogs", search, currentPage, rowsPerPage, Role, Sorting],
    queryFn: Blogs,
  });
};
