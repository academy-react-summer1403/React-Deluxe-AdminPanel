import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddBuilding = () => {
  const AddBuilding = async (formData) => {
    try {
      console.log("Submitting form data:", formData);
      const res = await http.post("/Building", 

        formData
      );
      return res;
    } catch (error) {
      console.log("Error in useAddBuilding: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddBuilding"],
    mutationFn: AddBuilding,
  });
};
