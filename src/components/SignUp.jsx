import React, { useRef, useState } from 'react';
import { auth, provider } from '../firebase-config'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const SignUp = ({ setIsAuth }) => {

    let navigate = useNavigate();

    const emailRef = useRef();
    const nameRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState("")


    // const { registerUser } = useUserContext()

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const password = passwordRef.current.value;

        if (email && name && password) {
            //crea nuevo usuario...
            createUserWithEmailAndPassword(auth, email, password)
                .then(() =>  //modifica el nombre
                    updateProfile(auth.currentUser, {
                        displayName: name,
                    })
                )
                .then((res) => {
                    console.log(res);
                    localStorage.setItem('isAuth', true);
                    setIsAuth(true);
                    localStorage.setItem('currentUser', auth.currentUser.displayName);
                    navigate('/');
                })
                .catch((err) => setError(err.message));
        }
    };

    return <div className="form">
        <h2> Nuevo usuario </h2>

        <form onSubmit={onSubmit}>
            <input placeholder="Email" type="email" ref={emailRef} />
            <input placeholder="Nombre" type="name" ref={nameRef} />
            <input placeholder="Password" type="password" ref={passwordRef} />
            <button type="submit">Registrar</button>
            {error && <p className="error">{error}</p>}
        </form>
    </div>;

};

