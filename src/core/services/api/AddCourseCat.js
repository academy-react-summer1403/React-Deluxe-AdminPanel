import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddCourseCat = () => {
  const AddCourseCat = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await http.post("/News/CreateNewsCategory", 
        // CategoryName: values.CategoryName,
        // GoogleTitle: values.GoogleTitle,
        // GoogleDescribe: values.GoogleDescribe,
        formData
      );
      return res;
    } catch (error) {
      console.log("Error in useAddCourseCat: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddCourseCat"],
    mutationFn: AddCourseCat,
  });
};
