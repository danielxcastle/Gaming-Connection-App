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
		<nav className="navbar game-nav">
			<div className="container">
				<div className="row">
					<div className="col-4">
						<img
							src={logo}
							className="navbar-brand"
							onClick={onHome}
						/>
					</div>
					<div className="col-4">

						< SearchUser />
					</div>

					<div className="col-4">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div>
				</div>
			</div>
		</nav >
	);
};
