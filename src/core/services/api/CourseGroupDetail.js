import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseGroupDetail = (groupId) => {
  const CourseGroupDetail = async () => {
    const query = {};
    if (groupId !== "" && groupId !== null) query.Id = groupId;
    try {
      const res = await http.get("/CourseGroup/Details", { params: query });
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return useQuery({
    queryKey: ["CourseGroupDetail", groupId],
    queryFn: CourseGroupDetail,
  });
};
