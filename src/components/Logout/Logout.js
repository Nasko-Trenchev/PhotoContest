import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { UserAuth } from "../../contexts/UserContext";
import { auth } from "../../config/Firebase";

export default function Logout() {

    const { signOutUser } = UserAuth();
    const navigate = useNavigate();

    const onLogout = useCallback(async () => {

        await signOutUser(auth);
    }, [signOutUser])

    useEffect(() => {
        onLogout();
        navigate("/");
        // logout(user.accessToken)
        //     .then(() => {
        //         userLogoutHandler();
        //         navigate("/");
        //     });
    }, [onLogout, navigate])

    return null;
}