import React from 'react'
import { ref, uploadBytesResumable } from '@firebase/storage';
import { useEffect, useState } from 'react/cjs/react.development'
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL } from 'firebase/storage';


export const CreatePost = ({ isAuth }) => {

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    const [Imagen, setImagen] = useState();
    const [progress, setProgress] = useState(0);
    let navigate = useNavigate();

    //referencia de la base de datos/coleccion de firestore
    //necesitamos crearlo para agregar datos en la BD
    const postCollectionRef = collection(db, 'posts');

    //===================================================
    //GUARDA UN NUEVO POST
    const createPost = async (image) => {

        //recupera la URL guardada y quita los / del string
        var yourString = JSON.stringify(localStorage.getItem('url'))
        var urlImg = yourString.slice(1, -1);
        //console.log('urllllllllll: ' + urlImg);

        if (!title || !postText) {
            alert('Rellena los campos');
            return;
        }

        let nuevoDoc = {
            title,
            postText,
            author:
            {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
                img: urlImg    //image.name
            }
        }

        await addDoc(postCollectionRef, nuevoDoc);
        navigate('/');
    };
    //====================================
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [])

    //=====================================
    //OBTENIENDO LA IMAGEN
    const changeImagen = (e) => {
        setImagen(e.target.files[0])
    }

    //==========================================
    //CARGA LA IMAGEN
    const uploadFile = (file) => {

        if (!file) {
            alert('Please inser an image')
            return;
        }
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(prog);
        },

            (err) => { console.error(err) },
            //consigo la Url de la imagen
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log('acabo de capturar la url: ' + url);
                    //guardo la url en local storage para recuperarla despues
                    localStorage.setItem('url', url);
                })
            }
        )
    }


    return (
        <div className="createPostPage">

            <div className="cpContainer">
                <h2>Create a Post</h2>
                <div className="inputGp">
                    <label htmlFor="">Title:</label>
                    <input type="text" placeholder="Title..."
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="inputGp">
                    <label htmlFor="">Post:</label>
                    <textarea placeholder="Post..."
                        onChange={(e) => setPostText(e.target.value)}></textarea>
                </div>
                <aside id="modal" className="modal">
                    <div className="content-modal">
                        <header>
                            <input type="file" name="imagen" onChange={changeImagen} />
                            <button onClick={() => uploadFile(Imagen)}>Cargar imagen</button>
                            <h4>Cargado: {progress}%</h4>
                        </header>
                    </div>
                </aside>
                <button
                    onClick={() => { createPost(Imagen) }} >Submit Post</button>
            </div>
        </div>
    )
}
