import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useUserComment = (id) => {
  const UserComment = async () => {
    try {
      const res = await http.get(`/Course/CommentManagment?userId=${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["UserComment", id],
    queryFn: UserComment,
  });
};
