import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEditUser = () => {
  const EditUser = async (userValue) => {
    try {
      const res = await http.put(`/User/UpdateUser`, userValue);
      return res;
    } catch (error) {
      console.log("Error in useEditUser: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EditUser"],
    mutationFn: EditUser,
  });
};
