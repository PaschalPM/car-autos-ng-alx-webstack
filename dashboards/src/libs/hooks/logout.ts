import { useNavigate } from "react-router-dom"
import useAuthUserProfile from "../../store/auth-user"
import useAuthJWTToken from "../../store/jwt-token"

const useLogout = (navigateTo: string = '/') => {
    const resetUserProfile = useAuthUserProfile((state) => state.resetUserProfile)
    const resetUserJWTToken = useAuthJWTToken((state) => state.resetUserJWTToken)
    const navigate = useNavigate()

    return () =>{
        resetUserProfile()
        resetUserJWTToken()
        localStorage.removeItem("refresh-token")
        navigate(navigateTo)
    }
}

export default useLogout