import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseCommentReply = (courseId, commentId) => {
  const CourseCommentReply = async () => {
    try {
      const res = await http.get(
        `/Course/GetCourseReplyCommnets/${courseId}/${commentId}`
      );
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseCommentReply", courseId, commentId],
    queryFn: CourseCommentReply,
  });
};
