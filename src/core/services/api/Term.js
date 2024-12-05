import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useTerms = (data,isError,rowsPerPage) => {
  const Terms = async () => {
    try {
      const query = {};

    if (rowsPerPage !== "" && rowsPerPage !== null)
    query.RowsOfPage = rowsPerPage;

      const res = await http.get("/Term");
      return res;
    } catch (error) {
      console.log("Error in Terms: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["Terms",rowsPerPage],

    queryFn: Terms,
  });
  
};
