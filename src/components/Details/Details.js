import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from '../../config/Firebase';
import { UserAuth } from "../../contexts/UserContext";
import Comment from "../Comment/Comment";
import {doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import styles from './Details.module.css'


export default function Details() {

    const [currentPhoto, setCurrentPhoto] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [photoCreator, setPhotoCreator] = useState('');
    const [hasVoted, sethasVoted] = useState(false);

    const { photoId } = useParams();
    const { user } = UserAuth();
    const navigate = useNavigate();

    const currentPhotoRef = doc(db, "Photos", photoId);
    const currentPhotoCollectionRef = doc(db, "Photos", photoId, "UserLikes", `${user?.uid}`);
    console.log(user.uid)

    useEffect(() => {

        const getPhoto = async () => {  
            const docSnap = await getDoc(currentPhotoRef);
            setCurrentPhoto(docSnap.data());
            setLikeCount(docSnap.data().likeCount)
            setPhotoCreator(docSnap.data().userEmail);
        }
        const UserHasLikedTHePhoto = async () => {
            try {
                const docSnap = await getDoc(currentPhotoCollectionRef);
                console.log(user?.uid);
                console.log(hasVoted);
                if (docSnap.exists()) {
                    sethasVoted(true);
                    console.log("Document data:", docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPhoto();
        UserHasLikedTHePhoto();
    }, [user, photoId])

    const increaseLike = async () => {
        await setDoc(doc(db, "Photos", `${photoId}`, "UserLikes", `${auth?.currentUser?.uid}`), {
            UserId: auth?.currentUser?.uid,
        })
        console.log(currentPhoto);
        await updateDoc(currentPhotoRef, { likeCount: likeCount + 1 })
        sethasVoted(true);
    }

    return (
        <main className={styles["details-page"]}>
            <div className={styles["photo-container"]}>
                <h1 className={styles["name"]}>
                    {currentPhoto.title} by {photoCreator} - {likeCount} {likeCount === 1 ? "like" : "likes"}
                </h1>
                <img src={currentPhoto.imageUrl} alt="Details" className={styles["photo"]} />
            </div>
            <div className={styles["details-container"]}>
                <h1 className={styles["name"]}>{currentPhoto.contestName}</h1>
                {user &&
                    <div className={styles["like-section"]}>
                        {user.uid !== currentPhoto.userId ?
                            <>
                                {hasVoted ? <p className={styles["likePar"]}>{photoCreator} appreciates your like! &#10084;</p>
                                    :
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png"
                                        alt="Like"
                                        onClick={increaseLike} />}
                            </>
                            :
                            <>
                                <button className={styles["editButton"]} onClick={() =>
                                    navigate(`/edit/${currentPhoto.category}/${photoId}`)}>
                                    Edit
                                </button>
                            </>}
                    </div>}
                <Comment />
            </div>
        </main>
    )
}