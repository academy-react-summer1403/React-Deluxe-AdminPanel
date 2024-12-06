import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useClassRoomDetail = (id) => {
  const ClassRoomDetail = async () => {
    try {
      const res = await http.get(`/ClassRoom/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["ClassRoomDetail", id],
    queryFn: ClassRoomDetail,
  });
};
