import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function Signup({ isLoggedIn, signUp }) {
    const [values, setValues] = useState({'email': '', 'password': ''});
    const [isSubmitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.name] : e.target.value
        }))
    };

    const onSubmit = () => {
        const response = signUp(values['email'], values['password'])
        if (response['isError']){
            console.log(response['msg'])
        } else {
            setSubmitted(true)
        }
    };

    const handleSubmit = (e) => {
        onSubmit()
        e.preventDefault()
    };

    if (isLoggedIn) {
        return <Navigate to='/' />;
    }

    if (isSubmitted) {
        return <Navigate to='/log-in' />;
    }

    return (
        <>
            <div className="middle-center">
                <h1>Sign Up</h1>
                <div className="form-con">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                value={values['email']}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                value={values['password']}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
