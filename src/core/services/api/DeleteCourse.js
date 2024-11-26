import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useDeleteCourse = () => {
  const DeleteCourse = async ({ CourseId, isActive }) => {
    try {
      //   console.log(CourseId, isActive);
      await http.delete(`/Course/DeleteCourse`, {
        data: {
          active: isActive,
          id: CourseId,
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["DeleteCourse"],
    mutationFn: DeleteCourse,
  });
};
