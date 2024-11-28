import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useBlogCommentReply = (blogId) => {
  const BlogCommentReply = async () => {
    const query = {};
    if (blogId !== "" && blogId !== null) query.Id = blogId;
    try {
      const res = await http.get(`/News/GetRepliesComments`, { params: query });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["BlogCommentReply", blogId],
    queryFn: BlogCommentReply,
  });
};
