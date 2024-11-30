import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useAddBlogCategory = () => {
  const AddBlogCategory = async () => {
    try {
      const res = await http.get("/News/GetListNewsCategory");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["AddBlogCategory"],
    queryFn: AddBlogCategory,
  });
};
