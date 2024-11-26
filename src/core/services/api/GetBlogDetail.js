import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useGetBlogDetails = (id) => {
  const GetBlogDetails = async () => {
    console.log(id);
    try {
      const res = await http.get(`/News/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["GetBlogDetails", id],
    queryFn: GetBlogDetails,
  });
};
