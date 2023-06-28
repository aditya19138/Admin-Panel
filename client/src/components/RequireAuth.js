import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Cookies } from "react-cookie";

const RequireAuth = () => {
    // const { auth } = useAuth();
    const cookie = new Cookies()
    const location = useLocation();

    const auth = cookie.get('token')
    console.log(auth)

    return (
        auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;