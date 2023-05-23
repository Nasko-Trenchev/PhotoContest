import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { UserAuth } from "../../contexts/UserContext";
import { AlertContext } from '../../contexts/AlertContext';

import { db } from '../../config/Firebase';
import { doc, getDocs, collection, setDoc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

import styles from './Comment.module.css'

// import { getCommentsWithUsers, createComment, deleteComment } from '../../services/CommentService';

export default function Comment() {

    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState('');

    const { photoTitle } = useParams();
    const { user } = UserAuth();
    const { setAlertState } = useContext(AlertContext)
    const navigate = useNavigate();

    const currentPhotoRef = doc(db, "Photos", photoTitle);
    const currentPhotoComments = collection(db, "Photos", photoTitle, "Comments");

    useEffect(() => {
        const DbComments = async () => {
            try {
                const docSnap = await getDocs(currentPhotoComments);
                const filteredData = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setComments(filteredData);
                console.log(filteredData);
            } catch (error) {
                console.log(error)
            }
        }
        DbComments();
        // getCommentsWithUsers(photoId)
        //     .then(result => {
        //         setComments(result);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
    }, [])

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

            setComments(oldstate => [...oldstate, { comment: currentComment, userEmail: user.email, userUid: user.uid }]);
            setCurrentComment('')
        } catch (error) {
            console.log(error)
        }


        // createComment({ photoId: photoId, user: user, comment: currentComment })
        //     .then(result => {
        //         setComments(oldstate => [...oldstate, result]);
        //         setCurrentComment('');
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
    }

    const onDeleteComment = async (id) => {
        await deleteDoc(doc(db, "Photos", photoTitle, "Comments", `${id}`))
        setComments(oldState => oldState.filter(x => x.id !== id));
        // deleteComment(id)
        //     .then(() => {
        //         setComments(oldState => oldState.filter(x => x._id !== id));
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
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
                                <i onClick={() => navigate(`/comments/${photoTitle}/${x.id}/edit`)} className='fas'>&#xf591;</i>
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