import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from "react";
import { UserAuth } from '../../../contexts/UserContext';
import { AlertContext } from '../../../contexts/AlertContext';
import { db } from '../../../config/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import Input from '../../Input/Input';

import styles from './EditComment.module.css';

// import { editComment, getComment } from '../../../services/CommentService';

export default function EditComment() {

    const [formInput, setFormInput] = useState('');
    const [currentComment, setCurrentComment] = useState({})

    const { commentId, photoId } = useParams();
    console.log(commentId);
    const { user } = UserAuth();
    const { setAlertState } = useContext(AlertContext)

    const commentRef = doc(db, "Photos", `${photoId}`, "Comments", `${commentId}`);
    useEffect(() => {
        const getCurrentComment = async () => {
            const commentToUpdate = await getDoc(commentRef);
            setCurrentComment(commentToUpdate.data());
        }
        getCurrentComment();
    }, [commentId])

    const navigate = useNavigate();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        if (formInput === '') {
            setAlertState({ message: 'Comments should have content!', show: true })
            setFormInput('')
            return;
        }

        try {
            await updateDoc(commentRef, {
                comment: formInput
            })
            navigate(`/photos/${photoId}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h1 className={styles["paragraph"]}>Edit your comment</h1>
            <form className={styles["login-form"]} onSubmit={onFormSubmit} >
                <Input type="text" id="comment" label="Type your new comment"
                    onChange={(e) => setFormInput(e.target.value)} value={formInput} />
                <button type="submit">Edit comment</button>
            </form>
        </>
    )
}