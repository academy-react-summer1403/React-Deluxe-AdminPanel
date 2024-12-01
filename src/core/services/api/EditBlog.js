import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEditBlog = () => {
  const EditBlog = async (formData) => {
    try {
      const res = await http.put(`/News/UpdateNews`, formData);
      return res;
    } catch (error) {
      console.log("Error in useEditBlog: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EditBlog"],
    mutationFn: EditBlog,
  });
};
