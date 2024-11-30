import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseList = (currentPage, rowsPerPage, searchTerm, Role, Sort) => {
  const CourseList = async () => {
    try {
      const Params = {};
      if (currentPage !== "" && currentPage !== null)
        Params.PageNumber = currentPage;
      if (rowsPerPage !== "" && rowsPerPage !== null)
        Params.RowsOfPage = rowsPerPage;
      if (searchTerm !== "" && searchTerm !== null) Params.Query = searchTerm;
      if (Role !== "" && Role !== null) Params.SortingCol = Role;
      if (Sort !== "" && Sort !== null) Params.SortType = Sort;
      const res = await http.get("/Course/CourseList", { params: Params });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["CourseList", currentPage, rowsPerPage, searchTerm, Role, Sort],
    queryFn: CourseList,
  });
};
