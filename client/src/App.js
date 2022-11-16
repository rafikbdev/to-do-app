import React, { useState } from 'react';
import {
	Outlet,
	Route,
	Routes,
	NavLink
} from 'react-router-dom';

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

import './App.css';

function App() {
	const [user, setUser] = useState('');
	const [isLoggedIn, setLoggedIn] = useState(false);

	const logIn = (email, password) => {
		if(email.length <= 10 || password.length <= 5){
			return { isError: true, msg: 'Password and email must be set' };
		}

		setUser(email);
		setLoggedIn(true);
		return { isError: false };
	}

	const logOut = () => {
		setUser('');
		setLoggedIn(false);
	}

	return (
		<Routes>
			<Route path='/' element={<Layout isLoggedIn={isLoggedIn} logOut={logOut}/>} >
				<Route index element={<Landing isLoggedIn={isLoggedIn}/>} />
				<Route path='/log-in' element={<LogIn isLoggedIn={isLoggedIn} logIn={logIn}/>} />
				<Route path='/sign-up' element={<SignUp />} />
			</Route>
		</Routes>
	);
}


function Layout ({ isLoggedIn, logOut}){
	return (
		<>
			<div className="nav-con">
				<nav>
					<NavLink to='/'>Home</NavLink>
					{
						isLoggedIn && (
							<button className="log-out-btn"onClick={() => logOut()} >Log Out</button>
						)
					}
				</nav>
			</div>
			<div className="container-main">
				<Outlet />
			</div>
		</>
	)
}


export default App;
