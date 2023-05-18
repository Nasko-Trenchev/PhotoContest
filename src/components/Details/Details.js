import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from '../../config/Firebase';
import { UserAuth } from "../../contexts/UserContext";
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, getDocFromCache, where, query } from 'firebase/firestore'

import styles from './Details.module.css'

// import Comment from "../Comment/Comment";

// import { getImageDetails, getPhotoCreator } from '../../services/PhotoService';
// import { getLikeCount, createLike, getAllLikes } from '../../services/LikeService';

export default function Details() {

    const [currentPhoto, setCurrentPhoto] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [photoCreator, setPhotoCreator] = useState('');
    const [likes, setLikes] = useState([]);
    const [hasVoted, sethasVoted] = useState(false);

    const { photoTitle } = useParams();
    const { user } = UserAuth();
    // const { user, isAuthenticated } = useContext(UserContext);
    const navigate = useNavigate();

    const currentPhotoRef = doc(db, "Photos", photoTitle);
    const photosRef = collection(db, "Photos");


    // const query = collection(db, "Photos", "s1z5iNoM33rcZBJ7krug", "LikeUserId")

    // const [docs, loading, error] = useCollectionData(query);

    const getPhoto = async () => {
        const docSnap = await getDoc(currentPhotoRef)
        setCurrentPhoto(docSnap.data());
        setLikeCount(docSnap.data().likeCount)
        setPhotoCreator(docSnap.data().userEmail);
    }
    let unsubscribe;
    
    const currentPhotoCollectionRef = doc(db, "Photos", photoTitle, "UserLikes", `${user.uid}`);

    const UserHasLikedTHePhoto = async () => {

        // const q = await query(currentPhotoCollectionRef,
        //     where("UserId", " >=" , `${auth?.currentUser?.uid}`)
        // )
        // const getTopPhotos = await getDocs(q);
        // const filteredData = getTopPhotos.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        // console.log(filteredData);

        const docSnap = await getDoc(currentPhotoCollectionRef);
        console.log(user.uid)
        console.log("yes")
        if (docSnap.exists()) {
            sethasVoted(true);
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }




    useEffect(() => {

        const unsubscribe = UserHasLikedTHePhoto();

        getPhoto();
        UserHasLikedTHePhoto();
        // getImageDetails(photoId)
        //     .then(result => {
        //         setCurrentPhoto(result);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });;

        // getLikeCount(photoId)
        //     .then(result => {
        //         setLikeCount(result);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });

        // getPhotoCreator(photoId)
        //     .then(result => {
        //         setPhotoCreator(result);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
    }, [])

    // useEffect(() => {
    //     getAllLikes()
    //         .then(result => {
    //             setLikes(result);
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         });
    // }, [])

    // useEffect(() => {

    //     currentPhotoCollectionRef.get()
    //     .then((docSnapShot) => {
    //         if(docSnapShot.exists){
    //             sethasVoted(true)
    //         }
    //         else {
    //             sethasVoted(false);
    //         }
    //     })
    //     const hasLikes = currentPhotoCollectionRef.id === undefined ? false : true;
    //     const hasLikes = currentPhotoRef.data().UserLikes.some(x => x.id === auth.currentUser.uid)
    //     const hasLikes = likes.some(x => x._ownerId === user._id && x.photoId === photoId)
    //     sethasVoted(hasLikes)
    // }, [hasVoted, likes, user._id])

    const increaseLike = async () => {

        await setDoc(doc(db, "Photos", `${currentPhoto.title}`, "UserLikes", `${auth?.currentUser?.uid}`), {
            UserId: auth?.currentUser?.uid,
        })

        await updateDoc(currentPhotoRef, { likeCount: likeCount + 1 })

        // setLikeCount(oldValue => oldValue + 1)
        // createLike({ photoId: currentPhoto._id, categoryId: currentPhoto.categoryId })
        //     .then(() => {
        //         sethasVoted(true);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
        // getAllLikes()
        //     .then(result => {
        //         setLikes(result)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
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
                                    navigate(`/edit/${currentPhoto.categoryId}/${currentPhoto._id}`)}>
                                    Edit
                                </button>
                            </>}
                    </div>}
                {/* <Comment /> */}
            </div>
        </main>
    )
}