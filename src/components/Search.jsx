import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';


export const Search = () => {

    const [searchText, setSearchText] = useState('');
    console.log(searchText);

    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //buscador
    let searchPostList = postList.filter(post => post.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));

    console.log('Este es mi searchPostList: ');
    console.log(searchPostList);

    const postCollectionRef = collection(db, 'posts');
    const getPosts = async () => {
        setLoading(true);
        const data = await getDocs(postCollectionRef)
        console.log(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setPostList(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false)
    };

    useEffect(() => {

        getPosts();
    }, []);

    //::::::::::::::::
    const handleSearch = (e) => {
        e.preventDefault();

        if (searchText === '') {
            alert('Introduce un elemento a buscar')
            return false;
        }
        alert('lo has buscado');
        searchPostList = postList.filter(post => post.title.toLocaleLowerCase().includes(searchText));
        console.log('datos del buscador:')
        return searchPostList;
    }

    return (
        <div className="homePage">

            <div className="search-area">
                <h2>Escribe lo que busques:</h2>
                <br /><br />

                <form onSubmit={handleSearch} className="search-form">
                    <input type="text"
                        className="search-form"
                        placeholder="Turismo..."
                        onChange={(e) => (setSearchText(e.target.value))} />
                </form>
                <button onClick={handleSearch} className='btn btn-outline-dark mt-3' type="submit">Buscar...</button>

            </div><br /><br />

            {
                searchPostList.map((post) => {
                    return <div data-aos="zoom-in" className="post animate__animated animate__fadeIn" key={post.id}>
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
             {
                        loading == true ? <div><div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                            <div className="spinner-grow text-danger" role="status">
                                <span className="visually-hidden"></span>
                            </div></div> : null
                    }
        </div>
    )
}

