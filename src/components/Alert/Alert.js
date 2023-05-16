import styles from './Alert.module.css'
import { useContext, useEffect } from 'react'
import { AlertContext } from '../../contexts/AlertContext'


export default function Alert () {
    const { alertState, setAlertState } = useContext(AlertContext)

    useEffect(() => {
        const id = setTimeout(() => {
            setAlertState({ show: false, message: '' })
        }, 3000)
        return () => clearTimeout(id)
    }, [alertState, setAlertState])

    return (
        alertState.show && (
            <div onClick={() => setAlertState({ show: false, message: '' })} className={styles["alert"]}>
                <p>{alertState.message}</p>
            </div>
        )
    )
}

