import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEditCat = () => {
  const EditCat = async (formData) => {
    try {
      const res = await http.put(`/News/UpdateNewsCategory`, formData);
      return res;
    } catch (error) {
      console.log("Error in EditCat: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EditCat"],
    mutationFn: EditCat,
  });
};
