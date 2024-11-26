import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddCourse = () => {
  const AddCourse = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await http.post("/Course", formData);
      return res;
    } catch (error) {
      console.log("Error in useAddCourse: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddCourse"],
    mutationFn: AddCourse,
  });
};
