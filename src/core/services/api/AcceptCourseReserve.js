import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";

export const useAcceptCourseReserve = () => {
  const AcceptCourseReserve = async (courseId, studentId, courseGroupId) => {
    console.log(courseId, studentId, courseGroupId);
    try {
      await http.post(
        `/CourseReserve/SendReserveToCourse`,
        courseId,
        studentId,
        courseGroupId
      );
    } catch (error) {
      console.log("Error in useAcceptCourseReserve: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["AcceptCourseReserve"],
    mutationFn: AcceptCourseReserve,
  });
};
