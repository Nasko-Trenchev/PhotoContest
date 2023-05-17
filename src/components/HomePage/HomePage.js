import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/Firebase';
import { getDoc, doc, getDocs, collection } from 'firebase/firestore';

import styles from './HomePage.module.css'

export default function Main() {

    const [categories, setCategories] = useState([]);

    const categoriesRef = collection(db, "Categories");

    const getCategories = async () => {
        try {
            const data = await getDocs(categoriesRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setCategories(filteredData);

        } catch (error) {
            console.log(error.message);
        }

    }
    useEffect(() => {
        getCategories()
    }, [])

    const navigate = useNavigate();

    const handleOption = (id) => {
        navigate(`/categories/${id}`);
    };

    return (
        <main className={styles['gallery']}>
            <h1>Welcome to the photo gallery!</h1>

            {categories.length !== 0 && <h2>Select category to participate in:</h2>}
            <section>
                {categories.map(category =>
                    <div key={category._id} className={styles["box"]}>
                        <img src={category.ImageUrl} alt="Category" />
                        <div className={styles["image-overlay"]}>
                            <h2>{category.Name}</h2>
                            <button onClick={() => handleOption(category.id)}>View category</button>
                        </div>
                    </div>)}
                {categories.length === 0 && <h2>There aren`t any categories, yet</h2>}
            </section>
        </main>
    )
}