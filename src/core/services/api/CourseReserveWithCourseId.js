import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseReserveWithCourseId = (CourseId) => {
  const CourseReserveWithCourseId = async () => {
    try {
      const res = await http.get(`/CourseReserve/${CourseId}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseReserveWithCourseId", CourseId],
    queryFn: CourseReserveWithCourseId,
  });
};
