import React from 'react'
import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { CreatePost } from "./components/CreatePost"
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";




function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const logOut = () => {

    signOut(auth)
      .then(() => {

        //localStorage.clear();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuth');
        setIsAuth(false);
        window.location.pathname = "/login";
      })
    }
    return (
      <Router>
        <nav>
          <Link to='/Home'>Home</Link>
          {
            isAuth && <Link to='/createpost'>Create Post</Link>
          }

          {
            !isAuth ? <Link to='/login'>Login</Link> : <button onClick={logOut}>Sign Out</button>
          }

          <span>
            {
              isAuth && localStorage.getItem('currentUser')
            }
          </span>
        </nav>
        <Routes>
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/' element={<Home />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </Router>
    );
  }

  export default App;
