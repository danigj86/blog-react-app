import React from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { CreatePost } from "./components/CreatePost"

function App() {
  return (
    <Router>
      <nav>
        <Link to='/Home'>Home</Link>
        <Link to='/createpost'>Create Post</Link>
        <Link to='/login'>Login</Link>
      </nav>
      <Routes>
        <Route path='/login' element={ <Login /> }/>
        <Route path='/createpost' element={ <CreatePost/> }/>
        <Route path='/' element={ <Home/> }/>
        <Route path='/*' element={ <Home/> }/>
      </Routes>
    </Router>
  );
}

export default App;
