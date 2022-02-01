import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

export const MyPosts = ({ isAuth }) => {



    /* ((!loading) && ((postList.filter((post) => auth.currentUser.uid === post.author.id).length > 0))) ??
    <>

        <div>Aún no has escrito ningun post</div>

    </> */


    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    //::::: GET POST :::::::::::

    //creamos la referencia de la base de datos para recuperar los posts
    const postCollectionRef = collection(db, 'posts');
    //recuperamos posts de la DB
    const getPosts = async () => {
        setLoading(true);
        const data = await getDocs(postCollectionRef)
        console.log(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false)

    };

    //:::::: DELETE POST :::::::::
    const deletePost = async (id) => {
        //primero hacemos referencia al documento en concreto que deseamos
        //borrar, especificando los tres parametros (configuracionDB, nombre DB, id del documento a borrar)
        const postDoc = doc(db, 'posts', id)
        //y se borra con deleteDoc
        await deleteDoc(postDoc);
        //navigate('/createpost');
        getPosts();
    }

    useEffect(() => {

        getPosts();
    }, []);


    return (
        <div className="homePage">
            <h2>Tus últimos posts</h2>
            <br /><br /><br />
            {
                postList.map((post, index) => {
                    return <div  key={post.id}>
                        {
                            isAuth && post.author.id === auth.currentUser.uid &&
                            <div className="post" key={post.id}>
                                <div className="postHeader">

                                    <div className="title">
                                        <h2>{post.title}</h2>
                                    </div>
                                    <div className="deletePost">
                                        <button className="btnDelete"
                                            onClick={() => {
                                                deletePost(post.id);
                                            }}
                                        >
                                            {" "}
                                            &#128465;
                                        </button>
                                    </div>
                                </div>
                                {//:::::::::   IMAGEN POST  ::::::::::::::
                                    post.author.img && (<>
                                        <div className='imgPost'>
                                            <img src={post.author.img} />
                                        </div>
                                        <div className="postTextContainer">
                                            <p>
                                                {post.postText}
                                            </p>
                                            <h3>@{post.author.name}</h3>
                                        </div><br /><br />
                                    </>)
                                }
                            </div>

                        }
                    </div>

                })
            }
            <div>
                {
                    loading == true ? <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : null
                }
            </div>
            {
                !loading & postList.filter((post) => auth.currentUser.uid === post.author.id).length == 0 ? <div>Aún no has compartido ningún post. ¡Comparte una noticia con la comunidad!</div> : null





            }
        </div>)
};
