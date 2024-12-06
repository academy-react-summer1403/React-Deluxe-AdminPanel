import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseCatDetail = (id) => {
  const CourseCatDetail = async () => {
    try {
      const res = await http.get(`/News/GetNewsCategory/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["CourseCatDetail", id],
    queryFn: CourseCatDetail,
  });
};
