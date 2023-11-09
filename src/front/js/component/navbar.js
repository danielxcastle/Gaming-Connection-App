import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import logo from "../../img/nav-logo.png";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<img 
					src={logo}
					className="navbar-brand"
					/>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
