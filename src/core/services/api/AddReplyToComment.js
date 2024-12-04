import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import toast from "react-hot-toast";

export const useAddReplyToComment = () => {
  const AddReplyToComment = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await http.post("/Course/AddReplyCourseComment", formData);
      return res;
    } catch (error) {
      console.log("Error in AddReplyToComment: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddReplyToComment"],
    mutationFn: AddReplyToComment,
  });
};
