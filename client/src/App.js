import axios from 'axios';

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
	const [isLoggedIn, setLoggedIn] = useState(() => {
		return window.localStorage.getItem('user.auth') !== null;
	});

	const logIn = async (email, password) => {
		const url = 'http://localhost:8000/api/user/token/';
		try {
			const response = await axios.post(url, {email, password});
			window.localStorage.setItem(
				'user.auth', JSON.stringify(response.data)
			);
			setLoggedIn(true);
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	};

	const signUp = async (email, password) => {
		const url = 'http://localhost:8000/api/user/create/';
		try {
			const response = await axios.post(url, {email, password});
			console.log('Created user.', response.data)
		} catch (error) {
			console.error(error)
		}
	};

	const logOut = () => {
		window.localStorage.removeItem('user.auth')
	};

	return (
		<Routes>
			<Route path='/' element={<Layout isLoggedIn={isLoggedIn} logOut={logOut}/>} >
				<Route index element={<Landing isLoggedIn={isLoggedIn}/>} />
				<Route path='/log-in' element={<LogIn isLoggedIn={isLoggedIn} logIn={logIn}/>} />
				<Route path='/sign-up' element={<SignUp isLoggedIn={isLoggedIn} signUp={signUp}/>} />
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
							<form className='log-out-form'>
								<button
									className="log-out-btn"
									onClick={() => logOut()} >
										Log Out
									</button>
							</form>
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
