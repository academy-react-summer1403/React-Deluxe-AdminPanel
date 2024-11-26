import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseUser = (courseId) => {
  const CourseUser = async () => {
    const query = {};
    if (courseId !== "" && courseId !== null) query.CourseId = courseId;
    try {
      const res = await http.get("/CourseUser/GetCourseUserList", {
        params: query,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseUser", courseId],
    queryFn: CourseUser,
  });
};
