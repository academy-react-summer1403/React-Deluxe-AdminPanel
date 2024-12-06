import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useAllCoursesGet = () => {
  const AllCoursesGet = async () => {
    try {
      const res = await http.get("Course/CourseList?PageNumber=1&RowsOfPage=1000");
      return res;
    } catch (error) {
      console.log("Error in Building: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["AllCoursesGet"],

    queryFn: AllCoursesGet,
  });
  
};
