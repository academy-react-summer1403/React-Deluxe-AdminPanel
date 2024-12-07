import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseDetail = (courseId) => {
  const CourseDetail = async () => {
    try {
      const res = await http.get(`/Course/${courseId}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseDetail", courseId],
    queryFn: CourseDetail,
  });
};
