import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseDetailStudent = (courseId) => {
  const CourseDetailStudent = async () => {
    const query = {};
    if (courseId !== "" && courseId !== null) query.CourseId = courseId;
    try {
      const res = await http.get("/Home/GetCourseDetails", {
        params: query,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseDetailStudent", courseId],
    queryFn: CourseDetailStudent,
  });
};
