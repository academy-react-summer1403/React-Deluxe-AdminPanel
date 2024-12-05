import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../interceptor";

export const useClassRooms = (data,isError,rowsPerPage) => {
  const ClassRooms = async () => {
    try {
      const query = {};

    if (rowsPerPage !== "" && rowsPerPage !== null)
    query.RowsOfPage = rowsPerPage;

      const res = await http.get("/ClassRoom");
      return res;
    } catch (error) {
      console.log("Error in ClassRooms: ", error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["ClassRooms",rowsPerPage],

    queryFn: ClassRooms,
  });
  
};
