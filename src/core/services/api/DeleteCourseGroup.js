import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useDeleteCourseGroup = () => {
  const DeleteCourseGroup = async (formData) => {
    console.log(formData)
    try {
      const res = await http.delete(`/CourseGroup`, {
        data: formData,
      });
      return res;
    } catch (error) {
      console.log("Error in DeleteCourseGroup: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["DeleteCourseGroup"],
    mutationFn: DeleteCourseGroup,
  });
};
