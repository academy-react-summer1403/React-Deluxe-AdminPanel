import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useDeleteBlog = () => {
  const DeleteBlog = async (id) => {
    try {
      const res = await http.delete(`/Blog/${id}`);
      return res;
    } catch (error) {
      console.log("Error in useDeleteBlog: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["DeleteBlog"],
    mutationFn: DeleteBlog,
  });
};
