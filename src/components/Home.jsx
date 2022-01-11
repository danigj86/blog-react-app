import React, { useEffect, useState } from 'react'

import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export const Home = ({ isAuth }) => {

    const [postList, setPostList] = useState([]);

    //creamos la referencia de la base de datos para recuperar los posts
    const postCollectionRef = collection(db, 'posts');

    //recuperamos el ID del user conectado
    console.log(localStorage.getItem('idUserPost'))
    console.log(auth.currentUser)


    //Al cargar este componente, se cargan los post de la BD
    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef)
            console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []);

    //funcion para borrar un documento (un post en este caso)
    const deletePost = async (id) => {
        //primero hacemos referencia al documento en concreto que deseamos
        //borrar, especificando los tres parametros (configuracionDB, nombre DB, id del documento a borrar)
        const postDoc = doc(db, 'posts', id)
        //y se borra con deleteDoc
        await deleteDoc(postDoc);
    }
    return (
        <div className="homePage">
            {
                postList.map((post) => {
                    return <div className="post" key={post.id}>
                        <div className="postHeader">
                            <div className="title">
                                <h2>{post.title}</h2>
                            </div>

                            <div className="deletePost">
                                
                                {//si el user esta conectado & el id.del creador del post === al id del user conectado.... se muestra el boton
                                isAuth && post.author.id === auth.currentUser.uid && (
                                    <button
                                        onClick={() => {
                                            deletePost(post.id);
                                        }}
                                    >
                                        {" "}
                                        &#128465;
                                    </button>
                                )}
                            </div>

                            {
                                post.author.img && (<>
                                <img src={post.author.img}/>
                                </>)
                            }
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
