import React, { useRef, useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase-config'



export const SignIn = ({ setIsAuth }) => {


    let navigate = useNavigate();

    const emailRef = useRef();
    const emailRef2 = useRef();
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
                localStorage.setItem('isAuth', true);
                setIsAuth(true);
                localStorage.setItem('currentUser', auth.currentUser.displayName);
                localStorage.setItem('idUserPost', auth.currentUser.uid);
                navigate('/');

            } catch (err) {
                setError(err.code)
            }
        } else {
            alert("Introducuce tus datos");
        }

    }
    const forgotPasswordHandler = () => {

        const email2 = emailRef2.current.value;
        if (email2) {
            sendPasswordResetEmail(auth, email2)
                .then(() => { alert('Revisa tu bandeja de entrada') })
                .catch((err) => setError(err.code))
                .finally(() => (emailRef2.current.value = ''));
        } else {
            alert('Escribe tu correo para recuperar la contraseña')
        }
    }

    return <div className="form">
        <h2>Login</h2>

        <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <p type="button"
                data-toggle="modal"
                data-target="#exampleModal"
            > ¿Olvidaste tu contraseña? </p>

            <button type="submit">Iniciar sesión</button>
            {error && <p className="error">{error === 'auth/invalid-email' ? 'Email no registrado' : 'Login o usuario incorrecto'}</p>}
        </form>
        {/* Modal */}
        <>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Recupera tu contraseña
                            </h5>

                        </div>
                        <div className="modal-body">Escribe tu correo electrónico para recuperar tu cuenta. Si tu correo está registrado, recibirás los pasos para reestablecer tu contraseña.
                            <input type="email" ref={emailRef2} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Escribe tu correo" />
                            <small id="emailHelp" className="form-text text-muted">(Nunca compartiremos tu correo o contraseña con nadie).</small>
                            <br />
                            <span>Revisa tu bandeja de entrada.</span>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                data-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="button" onClick={forgotPasswordHandler} data-dismiss="modal">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    </div>;

};
