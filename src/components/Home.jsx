import React, { useEffect, useState } from 'react'

import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export const Home = () => {

    const [postList, setPostList] = useState([]);

    //creamos la referencia de la base de datos para recuperar los posts
    const postCollectionRef = collection(db, 'posts');


    //Al cargar este componente, se cargan los post de la BD
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef)
            //console.log(data.docs.map((doc)=>({...doc.data(),id: doc.id})));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    });

    return (
        <div className="homePage">
            {
                postList.map((post) => {
                    return <div className="post">
                        <div className="postHeader">
                            <div className="title">
                                <h2>{post.title}</h2> 
                            </div>
                             <div className="deletePost"><button> &#128465; </button></div>
                        </div>
                        <div className="postTextContainer">
                            {post.postText}
                            <h3>@{post.author.name}</h3>
                        </div>

                    </div>;
                })
            }
        </div>
    )
}
