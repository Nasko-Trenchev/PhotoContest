import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore'

import styles from './MostLikedPhotos.module.css'

// import { getLikeCount } from '../../services/LikeService';

export default function MostLikedPhotos({
    data
}) {

    const [likeCount, setLikeCount] = useState(0);

    const photo = doc(db, "Photos", data.id);

    const getCurrentPhoto = async () => {

        try {
            const docSnap = await getDoc(photo);
            setLikeCount(docSnap.data().likeCount)
        } catch (error) {
            console.log(error.message)
        }

    }

    useEffect(() => {
        getCurrentPhoto();
        // getLikeCount(data._id)
        //     .then(result => {
        //         setLikeCount(result);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
    }, [])

    const navigate = useNavigate();

    const handleOption = (Id) => {
        navigate(`/photos/${Id}`);
    };

    return (
        <div className={styles["box"]}>
            <img src={data.imageUrl} alt="Top" />
            <div className={styles["image-overlay"]}>
                <h3>{data.title}</h3>
                {likeCount !== 0 && <p>Current likes {likeCount}</p>}
                <button onClick={() => handleOption(data.id)}>See details</button>
            </div>
        </div>
    )
}