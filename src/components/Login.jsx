import React from 'react'
import { auth, provider } from '../firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Auth } from './Auth'

export const Login = ({ setIsAuth }) => {

    let navigate = useNavigate();

    const signInWithGoogle = () => {

        signInWithPopup(auth, provider)
            .then((result) => {
                //console.log(result.user.auth.currentUser.displayName);
                console.log(result.user.auth.currentUser.uid);
                console.log(auth.currentUser.displayName)
                localStorage.setItem('isAuth', true);
                localStorage.setItem('idUserPost', auth.currentUser.uid);
                localStorage.setItem('currentUser', result.user.auth.currentUser.displayName);
                setIsAuth(true);
                navigate('/', {
                    replace: true
                });
            });
    }

    return (
        <div className="loginPage">
            <Auth setIsAuth={setIsAuth}/>
            <br />
            <button className="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}
