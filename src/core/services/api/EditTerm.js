import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEditTerm = () => {
  const EditTerm = async (formData) => {
    try {
      const res = await http.put(`/Term`, formData);
      return res;
    } catch (error) {
      console.log("Error in EditTerm: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EditTerm"],
    mutationFn: EditTerm,
  });
};
