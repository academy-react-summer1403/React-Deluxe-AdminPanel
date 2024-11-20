import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import toast from "react-hot-toast";

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
    // const test = () => {toast.succed()},
    // onMutate: () => {
    //   const blogToast = toast.loading("Adding blog...");
    // },
    onSuccess: () => {
      // toast("Blog added successfully!");
    },
    onError: (error, blogToast) => {
      // toast.error("Error while adding Blog", {
      //   id: blogToast,
      // });
      console.error("Error while adding blog:", error);
    },
  });
};
