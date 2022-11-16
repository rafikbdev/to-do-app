import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'


function LogIn({ isLoggedIn, logIn }) {
    const [values, setValues] = useState({'email': '', 'password': ''});
    const [isSubmitted, setSubmitted] = useState(false);

    const onSubmit = () => {
        const response = logIn(values['email'], values['password']);
        if(response['isError']){
            console.log(response['msg'])
        } else {
            setSubmitted(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    };

    if(isLoggedIn || isSubmitted){
        return <Navigate to='/' />
    };

    return (
        <>
            <div className="middle-center">
                <h1>Login</h1>
                <div className="form-con">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="email" name="email" value={values['email']} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" value={values['password']}  onChange={handleChange}/>
                        </div>
                        <div>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LogIn;
