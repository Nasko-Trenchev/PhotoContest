import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../config/Firebase';
import { doc, getDoc } from 'firebase/firestore'

import styles from './AllPhotos.module.css'

// import { getLikeCount } from '../../services/LikeService';


export default function AllPhotos({
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
        getCurrentPhoto()
        // getLikeCount(data._id)
        //     .then(result => {
        //         setLikeCount(result);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });
    }, []);

    const navigate = useNavigate();

    const handleOption = (id) => {
        navigate(`/photos/${id}`);
    };

    return (
        <div className={styles["box"]}>
            <img src={data.imageUrl} alt="Category" />
            <div className={styles["image-overlay"]}>
                <h3>{data.title}</h3>
                <p>Current likes {likeCount}</p>
                <button onClick={() => handleOption(data._id)}>See details</button>
            </div>
        </div>
    )
}