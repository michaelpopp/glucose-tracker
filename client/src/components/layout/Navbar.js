import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='navbar'>
			<ul>
				<li>
					<h1>Additional Resources</h1>
				</li>
				<li>
					<h1>About Us</h1>
				</li>
			</ul>
			<button>Login</button>
		</div>
	);
};

export default Navbar;
