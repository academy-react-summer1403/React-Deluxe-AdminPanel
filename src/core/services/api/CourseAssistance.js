import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useCourseAssistance = () => {
  const CourseAssistance = async () => {
    try {
      const res = await http.get("/CourseAssistance");
      return res;
    } catch (error) {
      console.log("Error in Building: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseAssistance"],

    queryFn: CourseAssistance,
  });
  
};
