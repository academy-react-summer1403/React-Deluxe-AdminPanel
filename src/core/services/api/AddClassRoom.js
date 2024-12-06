import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAddClassRoom = () => {
  const AddClassRoom = async (classValue) => {
    try {
      const res = await http.post("/ClassRoom",classValue);
      return res;
    } catch (error) {
      console.log("Error in useAddClassRoom: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["AddClassRoom"],
    mutationFn: AddClassRoom,
  });
};
