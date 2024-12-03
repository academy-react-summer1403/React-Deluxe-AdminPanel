import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useDeleteComment = () => {
  const DeleteComment = async ({ commentId }) => {
    const query = {};
    if (commentId !== "" && commentId !== null)
      query.CourseCommandId = commentId;
    try {
      const res = await http.delete(`/Course/DeleteCourseComment`, {
        params: query,
      });
      return res;
    } catch (error) {
      console.log("Error in useDeleteComment: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["DeleteComment"],
    mutationFn: DeleteComment,
  });
};
