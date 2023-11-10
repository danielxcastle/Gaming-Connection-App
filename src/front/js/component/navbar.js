import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import logo from "../../img/nav-logo.png";
import SearchUser from "./searchuser";

export const Navbar = () => {
	const navigate = useNavigate()
	const onHome = () => {
		navigate("/");
	};
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div>
				<img 
					src={logo}
					className="navbar-brand"
					onClick={onHome}
					/>
					< SearchUser />
				</div>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
