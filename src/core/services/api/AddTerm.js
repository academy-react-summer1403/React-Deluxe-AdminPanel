import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddTerm = () => {
  const AddTerm = async (termValue) => {
    try {
    //   console.log("Submitting form data:", formData);
      const res = await http.post("/Term",termValue);
      return res;
    } catch (error) {
      console.log("Error in AddTerm: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddTerm"],
    mutationFn: AddTerm,
  });
};
