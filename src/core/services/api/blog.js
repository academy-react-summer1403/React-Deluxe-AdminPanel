import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = (
  search,
  currentPage,
  rowsPerPage,
  Role,
  Sorting,
  Active
) => {
  const Blogs = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      if (Role !== "" && Role !== null) query.SortingCol = Role;
      if (Sorting !== "" && Sorting !== null) query.SortType = Sorting;
      if (Active !== "" && Active !== null) query.IsActive = Active;

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
    queryKey: [
      "Blogs",
      search,
      currentPage,
      rowsPerPage,
      Role,
      Sorting,
      Active,
    ],
    queryFn: Blogs,
  });
};
