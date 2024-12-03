import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseGroupsAll = (
) => {
  const CourseGroupsAll = async () => {
    try {
      const res = await http.get("CourseGroup?RowsOfPage=1000");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["CourseGroupsAll"],
    queryFn: CourseGroupsAll,
  });
};
