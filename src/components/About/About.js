import styles from './About.module.css'

export default function About() {

    return (
        <>
            <main className={styles['gallery']}>
                <h1>About page</h1>
                <section>
                    <p>This is a student web application that allows users to upload, view, like, and comment photos with others.
                        <br></br>
                        The main purpose of the project is to demonstrate the learned material in ReactJS course in February 2023.
                        <br></br>
                        In order to use the full functionallity of the application you`ll need to register.
                        <br></br>
                        The preffered format for pictures is square:
                        <br></br>
                        The application has the following features:
                    </p>
                    <ul>
                        <li>Users can create accounts and log in</li>
                        <li>Users can upload photos in different categories</li>
                        <li>Users can view photos uploaded by other users</li>
                        <li>Users can like and comment on photos</li>
                        <li>Users can edit their own photos</li>
                        <li>Users can edit and delete their own comments</li>
                    </ul>
                </section>
            </main>
        </>
    )
}