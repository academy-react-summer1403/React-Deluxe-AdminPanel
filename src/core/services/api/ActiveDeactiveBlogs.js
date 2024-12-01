import { QueryClient, useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import toast from "react-hot-toast";

export const useActiveDeactiveBlog = () => {
  const ActiveDeactiveBlog = async (formData) => {
    // console.log(data);
    try {
      await http.put(`/News/ActiveDeactiveNews`, 
        // Active: isActive == true ? false : true,
        // Id: BlogId,
        formData,
      );
    } catch (error) {
      console.log("Error in useActiveDeactiveBlog: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["ActiveDeactiveBlog"],
    mutationFn: ActiveDeactiveBlog,
  });
};
