import styles from './Input.module.css';

export default function Input({ type, label, value, onChange, id }) {

    return (
        <div className={styles['form-group']}>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} name={id} value={value} onChange={onChange} />
        </div>
    )
}