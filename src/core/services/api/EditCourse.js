import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEditCourse = () => {
  const EditCourse = async (formData) => {
    try {
      const res = await http.put(`/Course`, formData);
      return res;
    } catch (error) {
      console.log("Error in useEditCourse: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EditCourse"],
    mutationFn: EditCourse,
  });
};
