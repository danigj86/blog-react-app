import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const Auth = ({setIsAuth}) => {

    const [index, setIndex] = useState(true);

    return <div className="container">

        {index ? <SignIn setIsAuth={setIsAuth}/> : <SignUp setIsAuth={setIsAuth}/>}

        <p onClick={() => setIndex(!index)}>
            {index ? '¿Acabas de llegar? Regístrate' : '¿Ya tienes una cuenta?'}
        </p>


    </div>;
};
