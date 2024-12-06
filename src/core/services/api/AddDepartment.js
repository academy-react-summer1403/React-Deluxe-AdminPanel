import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddDepartment = () => {
  const AddDepartment = async (departmentValue) => {
    try {
      const res = await http.post("/Department",departmentValue);
      return res;
    } catch (error) {
      console.log("Error in useAddDepartment: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddDepartment"],
    mutationFn: AddDepartment,
  });
};
