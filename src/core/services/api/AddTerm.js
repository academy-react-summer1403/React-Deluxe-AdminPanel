import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddTerm = () => {
  const AddTerm = async () => {
    try {
    //   console.log("Submitting form data:", formData);
      const res = await http.post("/Term");
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
