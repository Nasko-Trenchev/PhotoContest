import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alertState, setAlertState] = useState(() =>({ show: false, message: '' }))

    return (
        <AlertContext.Provider value={
            {
                alertState,
                setAlertState
            }
        }>
            {children}
        </AlertContext.Provider>
    )
}