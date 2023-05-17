import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from '../../contexts/UserContext'

const RouteGuard = () => {

    const { user } = UserAuth();

    if (!user) {

        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default RouteGuard;