import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCatDetail = (id) => {
  const CatDetail = async () => {
    try {
      const res = await http.get(`/News/GetNewsCategory/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["CatDetail", id],
    queryFn: CatDetail,
  });
};
