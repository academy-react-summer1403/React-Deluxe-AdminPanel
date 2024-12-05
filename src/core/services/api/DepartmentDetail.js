import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useDepartmentDetail = (id) => {
  const DepartmentDetail = async () => {
    try {
      const res = await http.get(`/Department/${id}`);
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["DepartmentDetail", id],
    queryFn: DepartmentDetail,
  });
};
