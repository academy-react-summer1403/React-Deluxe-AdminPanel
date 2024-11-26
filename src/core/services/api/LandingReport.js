import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useAllCourseInfo = () => {
  const AllCourseInfo = async () => {
    try {
      const res = await http.get("/Course/CourseList");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["AllCourseInfo"],
    queryFn: AllCourseInfo,
  });
};
