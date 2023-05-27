import { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { UserAuth } from "../../contexts/UserContext";
import { AlertContext } from '../../contexts/AlertContext';

import { db } from '../../config/Firebase';
import { doc, getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';

import styles from './Comment.module.css'

export default function Comment() {

    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState('');

    const { photoId } = useParams();
    const { user } = UserAuth();
    const { setAlertState } = useContext(AlertContext)
    const navigate = useNavigate();

    const currentPhotoComments = collection(db, "Photos", `${photoId}`, "Comments");

    const DbComments = useCallback(async () => {
        try {
            const docSnap = await getDocs(currentPhotoComments);
            const filteredData = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setComments(filteredData);
        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        DbComments();
    }, [DbComments])

    const submitComment = async (e) => {
        e.preventDefault();

        if (currentComment === '') {
            setAlertState({ message: 'Comments should have content!', show: true })
            setCurrentComment('')
            return;
        }

        try {
            await addDoc((currentPhotoComments), {
                comment: currentComment,
                userEmail: user.email,
                userUid: user.uid
            })

            DbComments();
            setCurrentComment('')
        } catch (error) {
            console.log(error)
        }
    }

    const onDeleteComment = async (id) => {
        await deleteDoc(doc(db, "Photos", `${`${photoId}`}`, "Comments", `${id}`))
        setComments(oldState => oldState.filter(x => x.id !== id));
    }

    return (
        <div className={styles["comment-section"]}>
            <h2 className={styles["comment-heading"]}>Comments</h2>
            <ul className={styles["comment-list"]}>
                {comments.length > 0 ? (comments.map(x =>
                    <li key={x.id} className={styles["comment"]}>
                        <span className={styles["comment-author"]}>{x.userEmail}:</span> {x.comment}
                        {user?.uid === x.userUid ?
                            <>
                                <i onClick={() => navigate(`/comments/${photoId}/${x.id}/edit`)} className='fas'>&#xf591;</i>
                                <i onClick={() => onDeleteComment(x.id)} className='far'>&#xf2ed;</i>
                            </> : null}
                    </li>))
                    : <p>There are no comments for this picture. Be the first to post!</p>}
            </ul>
            {user ?
                <form className={styles["comment-form"]} onSubmit={submitComment}>
                    <label htmlFor="comment" className={styles["comment-label"]}>Leave a Comment:</label>
                    <textarea id="comment" name="comment" className={styles["comment-input"]}
                        value={currentComment}
                        onChange={(e) => setCurrentComment(e.target.value)}>
                    </textarea>
                    <button type="submit" className={styles["comment-button"]}>Post Comment</button>
                </form>
                : <NavLink className={styles["navlink"]} to="/login">Login to comment and like this picture</NavLink>
            }
        </div>
    )
}