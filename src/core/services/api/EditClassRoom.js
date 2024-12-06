import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useEdiClassRoom = () => {
  const EdiClassRoom = async (ClassRoomValue) => {
    try {
      const res = await http.put(`/ClassRoom`, ClassRoomValue);
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
