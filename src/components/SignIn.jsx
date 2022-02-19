import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase-config'



export const SignIn = ({ setIsAuth }) => {


    let navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState("")
  
    /*     if (error === 'auth/user-not-found'){
            setErrorMsg('Usuario no encontrado')
        }else if(error === 'auth/wrong-password'){
            setErrorMsg('Password incorrecto')
        } */

    const onSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email && password) {
            ///
            console.log(`email: ${email}, password: ${password}`);

            try {
                const user = await signInWithEmailAndPassword(auth, email, password)
                console.log(user);
                setIsAuth(true);
                localStorage.setItem('currentUser', auth.currentUser.displayName);
                localStorage.setItem('idUserPost', auth.currentUser.uid);
                navigate('/');

            } catch (err) {
                setError(err.code)
            }

            /*  setIsAuth(true);
             navigate('/', {
                 replace: true
             }); */
        } else {
            alert("Introducuce tus datos");
        }

    }

    /*  const forgotPasswordHandler = () => {
         const email = emailRef.current.value;
         if(email){
             forgotPassword(email ).then(()=>(emailRef.current.value = ''));
             alert('Revisa tu bandeja de entrada')
         }else{
             alert('Escribe tu correo para recuperar la contraseña')
         } 
     }
  */

    return <div className="form">
        <h2>Login</h2>

        <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <p> ¿Olvidaste tu contraseña? </p>
            <button type="submit">Iniciar sesión</button>
            {error && <p className="error">{error}</p>}
        </form>
    </div>;
};
