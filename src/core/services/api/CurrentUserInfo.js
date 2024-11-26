import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserInfo = () => {
  const UserInfo = async () => {
    try {
      const res = await http.get("/SharePanel/GetProfileInfo");
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["UserInfo"],
    queryFn: UserInfo,
  });
};
