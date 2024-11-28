import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useCourseComment = (CourseId) => {
    const CourseComment = async () => {
        try {
            const res = await http.get(`/Course/GetCourseCommnets/${CourseId}`);
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return useQuery({
        queryKey: ["CourseComment", CourseId],
        queryFn: CourseComment,
    });
}