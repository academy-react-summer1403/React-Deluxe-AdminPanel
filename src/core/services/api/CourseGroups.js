import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseGroups = (courseId, TeacherId) => {
  const CourseGroups = async () => {
    const query = {};
    if (courseId !== "" && courseId !== null) query.CourseId = courseId;
    if (TeacherId !== "" && TeacherId !== null) query.TeacherId = TeacherId;
    try {
      const res = await http.get("/CourseGroup/GetCourseGroup", {
        params: query,
      });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseGroups", courseId, TeacherId],
    queryFn: CourseGroups,
  });
};
