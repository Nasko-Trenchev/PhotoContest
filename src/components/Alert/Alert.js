import styles from './Alert.module.css'
import { useContext, useEffect } from 'react'
import { AlertContext } from '../../contexts/AlertContext'


export default function Alert () {
    const { alertState, setAlertState } = useContext(AlertContext)

    useEffect(() => {
        const id = setTimeout(() => {
            if(alertState.show) {
                setAlertState({ show: false, message: '' })
            }
        }, 3000)
        return () => clearTimeout(id)
    }, [alertState])

    return (
        alertState.show && (
            <div onClick={() => setAlertState({ show: false, message: '' })} className={styles["alert"]}>
                <p>{alertState.message}</p>
            </div>
        )
    )
}

