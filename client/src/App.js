import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard.js';
import Header from './components/Header/Header.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import AddTask from './components/AddTask/AddTask.js';

const App = () => {
	
	return (
        <>
			<Router>
                <Header />
				<Routes>
					<Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
					<Route path="/add-task" element={<AddTask />} />
				</Routes>
			</Router >
        </>
	);
}

export default App;