import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddCourseCat = () => {
  const AddCourseCat = async (values) => {
    try {
      console.log("Submitting form data:", values);
      const res = await http.post("/News/CreateNewsCategory", {
        CategoryName: values.CategoryName,
        GoogleTitle: values.GoogleTitle,
        GoogleDescribe: values.GoogleDescribe,
      });
      return res;
    } catch (error) {
      console.log("Error in useAddCourseCat: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddCourseCat"],
    mutationFn: AddCourseCat,
    // const test = () => {toast.succed()},
    // onMutate: () => {
    //   const blogToast = toast.loading("Adding blog...");
    // },
    onSuccess: () => {
      // toast("Blog added successfully!");
    },
    onError: (error) => {
      // toast.error("Error while adding Blog", {
      //   id: blogToast,
      // });
      console.error("Error while adding blog:", error);
    },
  });
};
