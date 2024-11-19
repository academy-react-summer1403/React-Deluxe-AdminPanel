import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddBlog = () => {
  const AddBlog = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await http.post("/News/CreateNews", formData);
      return res;
    } catch (error) {
      console.log("Error in useAddBlog: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddBlog"],
    mutationFn: AddBlog,
    onSuccess: () => {
      console.log("Blog added successfully!");
    },
    onError: (error) => {
      console.error("Error while adding blog:", error);
    },
  });
};
