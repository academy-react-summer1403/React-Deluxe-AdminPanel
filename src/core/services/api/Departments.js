import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useDepartments = (data,isError,rowsPerPage) => {
  const Departments = async () => {
    try {
      const query = {};

    if (rowsPerPage !== "" && rowsPerPage !== null)
    query.RowsOfPage = rowsPerPage;

      const res = await http.get("/Department");
      return res;
    } catch (error) {
      console.log("Error in Departments: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["Departments",rowsPerPage],

    queryFn: Departments,
  });
  
};
