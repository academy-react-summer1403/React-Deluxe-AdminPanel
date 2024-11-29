import { QueryClient, useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import toast from "react-hot-toast";

export const useActiveDeactiveCourse = () => {

  // const [activeDeactiveCourseMutation, { isLoading, isError }] = useMutation(
  //     async ({ CourseId, isActive }) => {
  //         try {
  //             const res = await http.put(`/Course/ActiveDeactiveCourse`, {
  //                 active: isActive,
  //                 id: CourseId,
  //             });
  //             return res;
  //         } catch (error) {
  //             console.log("Error in ActiveDeactiveCourse: ", error);
  //             throw error;
  //         }
  //     },
  //     {
  //         onSuccess: (data, variables) => {
  //             console.log("Course has been successfully updated", data);
  //         },
  //     }
  // );
  const ActiveDeactiveCourse = async (data) => {
    console.log(data);
    try {
      await http.put(`/Course/ActiveAndDeactiveCourse`, {
        active: data?.isActive == true ? false : true,
        id: data?.courseId,
      });
    } catch (error) {
      console.log("Error in useAcceptComment: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["ActiveDeactiveCourse"],
    mutationFn: ActiveDeactiveCourse,
  });
};
