import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = (search, role) => {
  const Blogs = async () => {
    try {
      const query = {};
      if (search !== "" && search !== null) query.Query = search;

      // if (role !== "" && role !== null) query.roleId = role;

      const result = await http.get("/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=10&SortingCol=InsertDate&SortType=DESC&Query=&IsActive=true", { params: query });
      console.log(result);

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return useQuery({
    queryKey: ["Blogs", search, role],

    queryFn: Blogs,
  });
};
