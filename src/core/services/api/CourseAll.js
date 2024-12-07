import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseAll = () => {
  const CourseAll = async () => {
    try {
      const res = await http.get("/Course/CourseList?PageNumber=1&RowsOfPage=1000");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["CourseAll"],
    queryFn: CourseAll,
  });
};
