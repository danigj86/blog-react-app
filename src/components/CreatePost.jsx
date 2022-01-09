import React from 'react'
import { useState } from 'react/cjs/react.development'
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');
    let navigate = useNavigate();

    //referencia de la base de datos/coleccion de firestore
    const postCollectionRef = collection(db, 'posts');

    const createPost = async () => {
        await addDoc(postCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }
        });
        navigate('/');
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
                <button 
                onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}
