import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseGroupList = (
  currentPage,
  rowsPerPage,
  searchTerm,
  Role,
  Sort
) => {
  const CourseGroupList = async () => {
    try {
      const Params = {};
      if (currentPage !== "" && currentPage !== null)
        Params.PageNumber = currentPage;
      if (rowsPerPage !== "" && rowsPerPage !== null)
        Params.RowsOfPage = rowsPerPage;
      if (searchTerm !== "" && searchTerm !== null) Params.Query = searchTerm;
      if (Role !== "" && Role !== null) Params.SortingCol = Role;
      if (Sort !== "" && Sort !== null) Params.SortType = Sort;
      const res = await http.get("/CourseGroup", { params: Params });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: [
      "CourseGroupList",
      currentPage,
      rowsPerPage,
      searchTerm,
      Role,
      Sort,
    ],
    queryFn: CourseGroupList,
  });
};
