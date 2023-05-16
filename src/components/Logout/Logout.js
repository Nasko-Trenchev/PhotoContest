import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserAuth } from "../../contexts/UserContext";
import { auth } from "../../config/Firebase";


// import { logout } from '../../services/AuthService';

export default function Logout() {
    // const { user, userLogoutHandler } = useContext(UserContext)

    const { signOutUser } = UserAuth();
    const navigate = useNavigate();

    const onLogout = async () => {

        await signOutUser(auth);
    }

    useEffect(() => {
        onLogout();
        navigate("/");
        // logout(user.accessToken)
        //     .then(() => {
        //         userLogoutHandler();
        //         navigate("/");
        //     });
    }, [navigate])

    return null;
}