import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseInfo = (Accept) => {
  const CourseInfo = async () => {
    const query = {};
    if (Accept !== "" && Accept !== null) query.Accept = Accept;

    try {
      const res = await http.get("/Course/CommentManagment", { params: query });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseInfo", Accept],
    queryFn: CourseInfo,
  });
};
