import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useAllUsersGet = () => {
  const AllUsersGet = async () => {
    try {
      const res = await http.get("/User/UserMannage?PageNumber=1&RowsOfPage=1000&IsActiveUser=true");
      return res;
    } catch (error) {
      console.log("Error in AllUsersGet: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["AllUsersGet"],

    queryFn: AllUsersGet,
  });
  
};
