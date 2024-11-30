import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAcceptComment = () => {
  const AcceptComment = async (CommentId) => {
    const query = {};
    if (CommentId !== "" && CommentId !== null)
      query.CommentCourseId = CommentId;
    try {
      await http.post(`/Comment/AcceptComment`, {
        params: query,
      });
    } catch (error) {
      console.log("Error in useAcceptComment: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["AcceptComment"],
    mutationFn: AcceptComment,
  });
};
