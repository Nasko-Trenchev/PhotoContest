import { useContext, useState } from "react";
import { UserAuth } from "../../contexts/UserContext";
import { useNavigate, NavLink } from "react-router-dom";
import { AlertContext } from '../../contexts/AlertContext'

import Input from "../Input/Input";

import styles from "./Register.module.css";

export default function Register() {

    const [formInput, setformInput] = useState({
        email: '',
        // username: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();
    const { createUser } = UserAuth()
    const { setAlertState } = useContext(AlertContext)

    const onUserInput = (e) => {
        setformInput(oldData => ({
            ...oldData,
            [e.target.name]: e.target.value
        }))
    }


    const onFormSubmit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line 
        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formInput.email);

        if (!validEmail) {
            setAlertState({ message: 'Email should have format like: example@gmail.com', show: true })
            return;
        }

        if (formInput.password !== formInput.confirmPassword) {
            setAlertState({ message: 'Passwords do not match!', show: true })
            return;
        }

        if (formInput.password.length < 6) {
            setAlertState({ message: 'Password should be at least 6 charachters long!', show: true })
            return;
        }

        // if (formInput.username.length < 3) {
        //     setAlertState({ message: 'Username should be at least 3 characters long!', show: true })
        //     return;
        // }
        try {
            await createUser(formInput.email, formInput.password);
            navigate('/');
        } catch (error) {
            setAlertState({ message: error.message, show: true })
            setformInput({
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            })
        }

        // register(formInput.email, formInput.password, formInput.username)
        //     .then(authData => {
        //         if (authData.code) {
        //             setAlertState({ message: authData.message, show: true })
        //             setformInput({
        //                 email: '',
        //                 username: '',
        //                 password: '',
        //                 confirmPassword: ''
        //             })
        //             return;
        //         }
        //         userLoginHandler(authData)
        //         navigate('/');
        //     })
        //     .catch((e) => {
        //         setAlertState({ message: e.message, show: true })
        //     })
    }

    return (
        <>
            <h1 className={styles["heading"]}>Register</h1>
            <h2 className={styles["secondHeading"]}>Create new account to submit your photos</h2>
            <form className={styles["register-form"]} onSubmit={onFormSubmit}>
                <Input type="text" id="email" label="Email" onChange={onUserInput} value={formInput.email} />
                {/* <Input type="text" id="username" label="Username" onChange={onUserInput} value={formInput.username} /> */}
                <Input type="password" id="password" label="Password" onChange={onUserInput} value={formInput.password} />
                <Input type="password" id="confirmPassword" label="Confirm Password" onChange={onUserInput} value={formInput.confirmPassword} />
                <button type="submit">Register</button>
                <NavLink className={styles["navlink"]} to="/login">Already a member?</NavLink>
            </form>
        </>
    )
}