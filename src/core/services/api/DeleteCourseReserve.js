import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useDeleteCourseReserve = () => {
  const DeleteCourseReserve = async ({ id }) => {
    try {
      const res = await http.delete(`/CourseReserve`, {
        data: {
          id,
        },
      });
      return res;
    } catch (error) {
      console.log("Error in useDeleteCourseReserve: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["DeleteCourseReserve"],
    mutationFn: DeleteCourseReserve,
  });
};
