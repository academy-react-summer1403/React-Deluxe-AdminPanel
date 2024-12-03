import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useDeleteUser = () => {
  const DeleteUser = async ({ userId }) => {
    try {
      await http.delete(`/User/DeleteUser`, {
        data: {
          userId: userId,
        },
      });
    } catch (error) {
      console.log("Error in useDeleteUser: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["DeleteUser"],
    mutationFn: DeleteUser,
  });
};
