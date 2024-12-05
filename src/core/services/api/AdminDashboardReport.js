import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

export const useAdminDashboardReport = () => {
    const AdminDashboardReport = async () => {
        try {
            const res = await http.get(`/Report/DashboardReport`);
            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return useQuery({
        queryKey: ["AdminDashboardReport"],
        queryFn: AdminDashboardReport,
    });
}