import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useDetailBuilding = (id) => {
  const DetailBuilding = async () => {
    try {
      const res = await http.get(`/Building/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["DetailBuilding", id],
    queryFn: DetailBuilding,
  });
};
