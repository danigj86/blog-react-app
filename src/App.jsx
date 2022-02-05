import React from 'react'
import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { CreatePost } from "./components/CreatePost"
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { MyPosts } from './components/MyPosts';
import { Search } from './components/Search';


function App() {

  const [show, setShow] = useState(false);
  console.log(show);

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const logOut = () => {

    signOut(auth)
      .then(() => {
        //localStorage.clear();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('idUserPost');
        setIsAuth(false);
        window.location.pathname = "/login";
      })
  }
  return (
    <Router>
      <nav>
        <Link to='/Home'>Home</Link>
        <div className='menu-elements' id={show ? 'active' : ''} >
          {
            isAuth && <Link to='/createpost' onClick={() => setShow(!show)}>Añadir post</Link>
          }

          {
            isAuth && <Link to='/myposts' onClick={() => setShow(!show)}>Mis posts</Link>
          }
          {
            isAuth && <Link to='/search' onClick={() => setShow(!show)}>Buscador</Link>
          }

          {
            !isAuth ? <Link to='/login' onClick={() => setShow(!show)}>Login</Link> : <button onClick={logOut}>Sign Out</button>
          }


          {
            //muestra nombre de usuario conectado
            isAuth ? <span> User: {localStorage.getItem('currentUser')}</span> : ''
          }
        </div>

        <div id="menu-btn"
          onClick={() => setShow(!show)}
          className={show ? 'fas fa-times' : 'fas fa-bars'} >
        </div>
        
      </nav>
      <Routes>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />} />
        <Route path='/search' element={<Search isAuth={isAuth} />} />
        <Route path='/myposts' element={<MyPosts isAuth={isAuth} />} />
        <Route path='/' element={<Home isAuth={isAuth} />} />
        <Route path='/*' element={<Home isAuth={isAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
