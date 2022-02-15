import React, { useState } from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const Auth = () => {

    const [index, setIndex] = useState(true);

    return <div className="container">

        {index ? <SignIn /> : <SignUp />}

        <p onClick={() => setIndex(!index)}>
            {index ? 'New user? Click here' : 'Already have an account?'}
        </p>


    </div>;
};
