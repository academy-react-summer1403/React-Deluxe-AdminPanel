import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCoursePayments = (CourseId) => {
  const CoursePayments = async () => {
    const query = {};
    if (CourseId !== "" && CourseId !== null) query.CourseId = CourseId;
    try {
      const res = await http.get("/CoursePayment", { params: query });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CoursePayments", CourseId],
    queryFn: CoursePayments,
  });
};
