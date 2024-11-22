import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseList = (currentPage, rowsPerPage) => {
  const CourseList = async () => {
    try {
      const Params = {};
      if (currentPage !== "" && currentPage !== null)
        Params.PageNumber = currentPage;
      if (rowsPerPage !== "" && rowsPerPage !== null)
        Params.RowsOfPage = rowsPerPage;
      const res = await http.get("/Course/CourseList", { params: Params });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["CourseList", currentPage, rowsPerPage],
    queryFn: CourseList,
  });
};
