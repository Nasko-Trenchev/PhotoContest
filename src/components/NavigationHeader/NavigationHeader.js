import { NavLink } from "react-router-dom";
import { UserAuth } from '../../contexts/UserContext'

import styles from './NavigationHeader.module.css';

export default function NavigationHeader() {
    
    const { user } = UserAuth();

    return (
        <header>
            <nav className={styles["navbar__menu"]}>
                <NavLink to="/" className={styles["bn8"]}><i className="fa fa-home"></i> Home</NavLink>
                <ul className={styles["navbar__list"]}>
                    <li><NavLink className={styles["navbar__item"]} to="/about">About</NavLink></li>
                    {user.accessToken ?
                        <>
                            <li><NavLink className={styles["navbar__item"]} to="/profile">Profile</NavLink></li>
                            <li><NavLink className={styles["navbar__item"]} to="/logout">Logout</NavLink></li>
                        </>
                        :
                        <>
                            <li><NavLink className={styles["navbar__item"]} to="/login">Login</NavLink></li>
                            <li><NavLink className={styles["navbar__item"]} to="/register">Register</NavLink></li></>}
                    {user.email === "admin@abv.bg" && <li><NavLink className={styles["navbar__item"]} to="/admin">Admin</NavLink></li>}
                </ul>
            </nav>
        </header>
    )
}