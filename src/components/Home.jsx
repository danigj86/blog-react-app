import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export const Home = ({ isAuth }) => {

    const [postList, setPostList] = useState([]);
    const navigate = useNavigate();

    //creamos la referencia de la base de datos para recuperar los posts
    const postCollectionRef = collection(db, 'posts');

    //recuperamos el ID del user conectado
    //console.log(localStorage.getItem('idUserPost'))
    //console.log(auth.currentUser);
    const getPosts = async () => {
        const data = await getDocs(postCollectionRef)
        console.log(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    //Al cargar este componente, se cargan los post de la BD
    useEffect(() => {

        getPosts();
    }, []);

    const postListFinal = postList.slice(postList.length-3 , postList.length)


    return (
        <div className="homePage">

            <div className="home-text">
                <h2>React Blog App</h2>
                <br />
                <h3>Aplicación construida con React + FireBase</h3>
                <h4>Loguéate con Google, busca, gestiona y publica posts interesantes!</h4>
            </div>
            {
                postListFinal.map((post) => {
                    return <div data-aos="zoom-in" className="post" key={post.id}>
                        <div className="postHeader">
                            {
                                //:::::::::   TITULO POST   ::::::::::::::
                            }
                            <div className="title">
                                <h2>{post.title}</h2>
                            </div>
                        </div>

                        {//:::::::::   IMAGEN POST  ::::::::::::::
                            post.author.img && (<>
                                <div className='imgPost'>
                                    <img src={post.author.img} />
                                </div> <br /><br />
                            </>)
                        }
                        {//:::::::::   TEXTO POST   ::::::::::::::
                        }
                        <div className="postTextContainer">
                            <p>
                                {post.postText}
                            </p>
                            <h3>@{post.author.name}</h3>
                        </div>

                    </div>;
                })
            }
        </div>
    )
}
