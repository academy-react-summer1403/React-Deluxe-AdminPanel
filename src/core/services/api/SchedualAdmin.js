import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useSchedualAdmin = (curMonth) => {
  const SchedualAdmin = async () => {
    try {
      const res = await http.get(
        `/Schedual/GetAdminScheduals?startDate=${curMonth.startStr.slice(0,10)}&endDate=${curMonth.endStr.slice(0,10)}`
      );
      return res;
    } catch (error) {
      console.log("Error in Status: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["SchedualAdmin", curMonth],
    queryFn: SchedualAdmin,
  });
};
