import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../contexts/UserContext";
import { db } from "../../config/Firebase";
import { collection, where, query, getDocs } from "firebase/firestore";

import AllPhotos from "../AllPhotos/AllPhotos";

import styles from './Profile.module.css'

const photoCollectionRef = collection(db, "Photos");

export default function Profile() {

    const [photosUploaded, setPhotosUploaded] = useState([]);

    const { user } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const queryTopPhotos = async () => {
            const q = await query(photoCollectionRef,
                where("userId", "==", `${user.uid}`))

            const getTopPhotos = await getDocs(q);
            const filteredData = getTopPhotos.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPhotosUploaded(filteredData)
        }

        queryTopPhotos();
    }, [user]);

    return (
        <>
            <main className={styles['gallery']}>
                <section>
                    <div className={styles["profile"]} >
                        <h1>Profile page</h1>
                        <ul>
                            <li><strong>Email: {user.email}</strong></li>
                            <li><strong>Total uploaded pictures: {photosUploaded.length}</strong></li>
                        </ul>
                    </div>
                </section>
                {photosUploaded.length > 0 ?
                    <>
                        <h2>Your pictures</h2>
                        <section>
                            {photosUploaded?.map(x => <AllPhotos key={x.id} data={x} />)}
                        </section>
                    </>
                    :
                    <>
                        <h2>You don`t have any uploaded pictures</h2>
                        <br></br>
                        <button className={styles["browseButton"]} onClick={() => navigate(`/`)}>Browse categories</button>
                    </>
                }
            </main>
        </>)
}
