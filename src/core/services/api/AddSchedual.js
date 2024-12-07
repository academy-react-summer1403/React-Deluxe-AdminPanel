import { useMutation } from "@tanstack/react-query";
import http from "../interceptor";
import { getItem, removeItem } from "../common/storage";

export const useAddSchedual = () => {
  const AddSchedual = async ({ courseId, groupId, eventDetails }) => {
    console.log(courseId, groupId, eventDetails);
    const body = {
      courseGroupId: groupId.value,
      startDate: eventDetails.startDate,
      startTime: eventDetails.startTime,
      endTime: eventDetails.endTime,
      weekNumber: eventDetails.weekNumber,
      rowEffect: eventDetails.eventDetails,
    };
    console.log("body", body);
    try {
      await http.post(`/Schedual/AddSchedualSingle`, body, {
        params: {
          currentCurseId: courseId,
        },
      });
      removeItem("AddedCourseId");
    } catch (error) {
      console.log("Error in AddSchedual: ", error);
      throw error;
    }
  };
  return useMutation({
    mutationKey: ["AddSchedual"],
    mutationFn: AddSchedual,
  });
};
