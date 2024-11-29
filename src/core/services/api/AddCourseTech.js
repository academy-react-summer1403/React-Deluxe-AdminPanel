import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import { getItem } from "../common/storage";

export const useAddCourseTech = () => {
  const AddCourseTech = async (TechnologyId) => {
    const AddedCourseId = getItem("AddedCourseId");
    console.log(AddedCourseId);
    try {
      await http.post(`/Course/AddCourseTechnology`, {
        technologyId: TechnologyId,
      });
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
