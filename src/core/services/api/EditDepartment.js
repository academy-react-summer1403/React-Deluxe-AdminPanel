import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEditDepatment = () => {
  const EditDepartment = async (formData) => {
    try {
      const res = await http.put(`/Department`, formData);
      return res;
    } catch (error) {
      console.log("Error in useEditDepatment: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EditDepartment"],
    mutationFn: EditDepartment,
  });
};
