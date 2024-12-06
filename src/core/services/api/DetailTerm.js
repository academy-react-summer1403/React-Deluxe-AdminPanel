import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useDetailTerm = (id) => {
  const DetailTerm = async () => {
    try {
      const res = await http.get(`/Term/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["DetailTerm", id],
    queryFn: DetailTerm,
  });
};
