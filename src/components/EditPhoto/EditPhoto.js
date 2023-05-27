import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertContext } from '../../contexts/AlertContext';
import { db } from "../../config/Firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import styles from './EditPhoto.module.css'

export default function EditPhoto() {
    const [currentPhoto, setCurrentPhoto] = useState({})
    const [formInput, setformInput] = useState({
        title: '',
        imageUrl: '',
        description: '',
    })
    const { photoId } = useParams();
    const { setAlertState } = useContext(AlertContext)
    const navigate = useNavigate();

    const currentPhotoRef = doc(db, "Photos", `${photoId}`);

    useEffect(() => {

        const getCurrentPhoto = async () => {
            try {
                const docSnap = await getDoc(currentPhotoRef);
                console.log(docSnap.data())
                setCurrentPhoto(docSnap.data())
            } catch (error) {
                console.log(error);
            }
        }
        getCurrentPhoto();
    }, [photoId])

    const handleChange = (e) => {
        setformInput({
            ...formInput,
            [e.target.id]: e.target.value,
        })
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (formInput.title.length < 3) {
            setAlertState({ message: 'Name should be at least 3 characters long!', show: true })
            return;
        }

        const validPhoto = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi.test(formInput.imageUrl)
        if (!validPhoto) {
            setAlertState({ message: 'Invalid photo URL', show: true })
            return;
        }

        if (formInput.description.length < 5) {
            setAlertState({ message: 'Description should be at least 5 characters long!', show: true })
            return;
        }

        try {
            await updateDoc(currentPhotoRef, {
                description: formInput.description,
                imageUrl: formInput.imageUrl,
                title: formInput.title
            })
        } catch (error) {
            console.log(error);
        }


        navigate(`/photos/${photoId}`)
    }
    return (
        <>
            <h1 className={styles["paragraph"]}>Edit Photo</h1>
            <form className={styles["login-form"]} onSubmit={onFormSubmit}>
                <label htmlFor="title">Photo name:</label>
                <input type="text" id="title" name="title" placeholder={currentPhoto?.title}
                    value={formInput.title} onChange={handleChange} />
                <label htmlFor="imageUrl">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" placeholder={currentPhoto?.imageUrl}
                    value={formInput.imageUrl} onChange={handleChange} />
                <label htmlFor="description">Photo description:</label>
                <input type="text" id="description" name="description" placeholder={currentPhoto?.description}
                    value={formInput.description} onChange={handleChange} />
                <button type="submit">Edit photo</button>
            </form>
        </>
    )
}