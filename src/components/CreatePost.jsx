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
    let navigate = useNavigate();

    //referencia de la base de datos/coleccion de firestore
    //necesitamos crearlo para agregar datos en la BD
    const postCollectionRef = collection(db, 'posts');

    //===================================================
    const createPost = async (image) => {

        uploadFile(image);

        if (!title || !postText) {
            alert('Rellena los campos');
            return;
        }

        await addDoc(postCollectionRef, {
            title,
            postText,
            author:
            {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid,
                img: image.name
            }
        });
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
    const uploadFile = (file) => {

        if (!file) {
            alert('Please inser an image')
            return;
        }
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
            (err) => { console.error(err) },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
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
                            
                        </header>
                    </div>
                </aside>
                <button
                    onClick={()=>{createPost(Imagen)} } >Submit Post</button>
            </div>
        </div>
    )
}
