import { useQuery } from "react-query";
import { axiosClient } from "../../requests/@config";
import { AxiosError, AxiosResponse } from "axios";
import useAuthUserProfile from "../../../store/auth-user";
import { ucfirst } from "../../utils";

const fetchAllUsers = () => axiosClient.get('/users')
const fetchSearchedUsers = (q: string) => axiosClient.get('/users', {params:{q}})

export const useManagerMarketersQuery = () => {
    const managerProfile = useAuthUserProfile((state) => state.userProfile)
    return useQuery<AxiosResponse<ServerUser[]>, AxiosError, UserValues[]>({
        queryKey: "marketers",
        queryFn: fetchAllUsers,
        select: (data) => {
            const users = data.data.filter(({ team_manager }) => managerProfile.id === team_manager).map((user) => ({
                id: user.id,
                firstname: ucfirst(user.firstname),
                lastname: ucfirst(user.lastname),
                email: user.email,
                phoneNumber: user.phone_number,
                username: ucfirst(user.username),
                createdAt: user.created_at,
                teamManager: user?.team_manager, 
                isManager: false
            }))
            return users
        }
    })
}

export const useManagerSearchedMarketersQuery = (q:string) => {
    const managerProfile = useAuthUserProfile((state) => state.userProfile)
    return useQuery<AxiosResponse<ServerUser[]>, AxiosError, UserValues[]>({
        queryKey: ["searched-marketers", q],
        queryFn: () => fetchSearchedUsers(q),
        select: (data) => {
            const users = data.data.filter(({ team_manager }) => managerProfile.id === team_manager).map((user) => ({
                id: user.id,
                firstname: ucfirst(user.firstname),
                lastname: ucfirst(user.lastname),
                email: user.email,
                phoneNumber: user.phone_number,
                username: ucfirst(user.username),
                createdAt: user.created_at,
                teamManager: user?.team_manager, 
                isManager: false
            }))
            return users
        }
    })
}