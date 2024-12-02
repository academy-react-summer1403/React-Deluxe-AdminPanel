import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import toast from "react-hot-toast";

export const useAddCourseGroup = () => {
  const AddCourseGroup = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await http.post("/CourseGroup", formData);
      return res;
    } catch (error) {
      console.log("Error in useAddCourseGroup: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddCourseGroup"],
    mutationFn: AddCourseGroup,
  });
};
