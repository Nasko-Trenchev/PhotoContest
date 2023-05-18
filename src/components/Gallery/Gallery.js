import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db, auth } from '../../config/Firebase';
import { getDocs, getDoc, collection, query, orderBy, limit, doc } from 'firebase/firestore'

import styles from './Gallery.module.css';

import MostLikedPhotos from '../MostLikedPhotos/MostLikedPhotos';
import AllPhotos from '../AllPhotos/AllPhotos';

// import { getCategory } from '../../services/CategoryService';
// import { getCategoryPhotos } from '../../services/PhotoService';
// import { getTopLikedPhotos } from '../../services/LikeService';

export default function Gallery() {

    const [topPhotos, setTopPhotos] = useState([]);
    const [allPhotos, setAllPhotos] = useState([]);
    const [category, setCategory] = useState({});
    const [showPhotos, setShowPhotos] = useState(true);

    const { categoryId } = useParams();

    const photoCollectionRef = collection(db, "Photos");


    const queryTopPhotos = async () => {

        const q = await query(photoCollectionRef,
            orderBy('likeCount', 'desc'),
            limit(3))

        const getTopPhotos = await getDocs(q);
        const filteredData = getTopPhotos.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTopPhotos(filteredData)
    }

    const getAllPhotos = async () => {
        const data = await getDocs(photoCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setAllPhotos(filteredData);
    }

    const getCategory = async () => {
        const categoryRef = doc(db, "Categories", categoryId);
        const docSnap = await getDoc(categoryRef);
        setCategory(docSnap.data())
    }

    useEffect(() => {

        queryTopPhotos();
        getAllPhotos();
        getCategory();
        // getTopLikedPhotos(categoryId)
        //   .then(result => {
        //     setTopPhotos(result);
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   });

        // getCategory(categoryId)
        //   .then(result => {
        //     setCategory(result)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   });

        // getCategoryPhotos(categoryId)
        //   .then(result => {
        //     setAllPhotos(result);
        //   }).catch(err => {
        //     console.log(err)
        //   });
    }, [])


    const navigate = useNavigate();

    const handleOption = (id) => {
        navigate(`/categories/${id}/createPhoto`);
    };

    return (
        <main className={styles['gallery']} >
            <button className={styles['createButton']} onClick={() => handleOption(categoryId)}>Join {category.Name} category</button>
            {topPhotos.length > 0 &&
                <>
                    <h2>The most liked photos:</h2>
                    <section>
                        {topPhotos.map(x => <MostLikedPhotos key={x.id} data={x} />)}
                    </section>
                    {allPhotos.length > topPhotos.length &&
                        <div>
                            <button className={styles['MoreButton']} onClick={() => setShowPhotos(!showPhotos)}>
                                {showPhotos ? "Hide photos" : "Load all photos"}
                            </button>
                        </div>
                    }
                </>
            }
            <section>
                {showPhotos && (allPhotos?.map(x => topPhotos.some(y => y.id === x.id)
                    ? null : <AllPhotos key={x.id} data={x} />))}
                {allPhotos.length === 0 && <h2>Currently there are no pictures for this category</h2>}
            </section>
        </main>
    )
}