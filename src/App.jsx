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
import { onAuthStateChanged } from "firebase/auth";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function App() {
  //toogle para mobile menu
  const [show, setShow] = useState(false);
  console.log(show);

  const [user, setUser] = useState(null);

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  //::::--- LOG OUT USER ---::::
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
            isAuth && <Link to='/createpost' onClick={() => setShow(!show)}>Añadir</Link>
          }

          {
            isAuth && <Link to='/myposts' onClick={() => setShow(!show)}>Posts</Link>
          }
          {
            isAuth && <Link to='/search' onClick={() => setShow(!show)}>Buscar</Link>
          }

          {
            !isAuth ? <Link to='/login' onClick={() => setShow(!show)}>Login</Link> : <p className='signOut-btn' onClick={logOut}>Sign Out</p>
          }


          {
            //muestra nombre de usuario conectado  //auth.currentUser.displayName   localStorage.getItem('currentUser')
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
