import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useSchedualAdmin = (data, isError, rowsPerPage) => {
  const SchedualAdmin = async () => {
    try {
      // const res = await http.get("/Schedual/GetAdminScheduals?startDate=2020-01-01&endDate=2026-01-01");
      // return res;
    } catch (error) {
      console.log("Error in Status: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["SchedualAdmin"],
    queryFn: SchedualAdmin,
  });
};
