import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useRejectComment = () => {
  const RejectComment = async (CommentId) => {
    const query = {};
    if (CommentId !== "" && CommentId !== null)
      query.CommentCourseId = CommentId;
    try {
      await http.post(`/Course/RejectCourseComment`, null, {
        params: query,
      });
    } catch (error) {
      console.log("Error in RejectComment: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["RejectComment"],
    mutationFn: RejectComment,
  });
};
