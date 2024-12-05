import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useStatus = (data,isError,rowsPerPage) => {
  const Status = async () => {
    try {
      const query = {};

    if (rowsPerPage !== "" && rowsPerPage !== null)
    query.RowsOfPage = rowsPerPage;

      const res = await http.get("/Status");
      return res;
    } catch (error) {
      console.log("Error in Status: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["Status",rowsPerPage],

    queryFn: Status,
  });
  
};
