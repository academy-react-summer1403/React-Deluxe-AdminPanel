import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const GetCreateCourse = () => {
  const CreateCourseInfo = async () => {
    try {
      const res = await http.get("/Course/GetCreate");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CreateCourseInfo"],
    queryFn: CreateCourseInfo,
  });
};
