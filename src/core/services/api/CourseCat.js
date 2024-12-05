import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseCat = (data,rowsPerPage) => {
  const CourseCat = async () => {
    try {
      const Params = {};
      if (rowsPerPage !== "" && rowsPerPage !== null)
        Params.RowsOfPage = rowsPerPage;
      const result = await http.get("/News/GetListNewsCategory");
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["CourseCat" , rowsPerPage],
    queryFn: CourseCat,
  });
};
