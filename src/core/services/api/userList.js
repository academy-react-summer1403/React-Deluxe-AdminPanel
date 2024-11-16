import http from "../interceptor";
import { useQuery } from "@tanstack/react-query";

 export const useUserList = () => {
    const UsersList = async () => {
        try {
            const result = await http.get("/User/UserMannage")
            return result
        } catch (error) {
            console.log(error)
        } 
    }
 useQuery({
    queryKey:["UserList"],
    queryFn: UsersList
 })
}




