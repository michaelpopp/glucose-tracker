import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import './App.css';

function App() {
	return (
		<div className='app'>
			<Navbar />
		</div>
	);
}

export default App;
