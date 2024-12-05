import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useBuilding = (data,isError,rowsPerPage) => {
  const Building = async () => {
    try {
      const query = {};

    if (rowsPerPage !== "" && rowsPerPage !== null)
    query.RowsOfPage = rowsPerPage;

      const res = await http.get("/Building");
      return res;
    } catch (error) {
      console.log("Error in Building: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["Building",rowsPerPage],

    queryFn: Building,
  });
  
};
