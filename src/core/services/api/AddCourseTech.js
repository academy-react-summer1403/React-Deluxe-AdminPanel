import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import { getItem, removeItem } from "../common/storage";

export const useAddCourseTech = () => {
  const AddCourseTech = async (Tech) => {
    const AddedCourseId = getItem("AddedCourseId");
    console.log("AddedCourseId", AddedCourseId);
    console.log("Technologies", Tech);
    const query = Tech?.map((option) => {
      return {
        techId: option.value,
      };
    });
    console.log("query", query);
    try {
      await http.post(`/Course/AddCourseTechnology`, query, {
        params: {
          courseId: AddedCourseId,
        },
      });
      removeItem("AddedCourseId");
    } catch (error) {
      console.log("Error in useAddCourseTech: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["AddCourseTech"],
    mutationFn: AddCourseTech,
  });
};
