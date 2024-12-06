import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEdiClassRoom = () => {
  const EdiClassRoom = async (formData)  => {
    try {
      const res = await http.put(`/ClassRoom`, formData );
      return res;
    } catch (error) {
      console.log("Error in useEdiClassRoom: ", error);
      throw error;
    }
  };

  return useMutation({
    mutationKey: ["EdiClassRoom"],
    mutationFn: EdiClassRoom,
  });
};
