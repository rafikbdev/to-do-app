import React from 'react';
import { Link } from 'react-router-dom';

function Landing(props) {
    return (
        <div className="middle-center">
            <h1>To-Do</h1>
            {
                props.isLoggedIn ?
                    <div className="btn-group">
                        <div className="btn-container">
                            <Link className="btn">Create list</Link>
                        </div>
                    </div>
                :
                <div className="btn-group">
                    <div className="btn-container">
                        <Link className="btn" to='/log-in'>Log In</Link>
                    </div>
                    <div className="btn-container">
                        <Link className="btn" to='/sign-up'>Sign Up</Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default Landing
