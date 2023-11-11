import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";
import logo from "../../img/nav-logo.png";
import SearchUser from "./searchuser";
import { Login } from "./login";
import { LoggedIn } from "./loggedin";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const onHome = () => {
        navigate("/");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="navbar ">
            <div className="container-fluid game-nav navbar-container">
                <div className="row">
                    <div className="col-4">
                        <img
                            src={logo}
                            className="navbar-brand"
                            onClick={onHome}
                        />
                    </div>
                    <div className="col-4">
                        <SearchUser />
                    </div>

                    <div className="col-4 login-nav-btn">
                        <button
                            onClick={toggleDropdown}
                            className="btn float-end menu-button">
                            Menu
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-content">
                                <div className="row">
                                    <div>
                                        {store.accessToken !== undefined ? (
                                            <LoggedIn
                                                style={{
                                                    width: "300px",
                                                    height: "300px",
                                                }}
                                            />
                                        ) : (
                                            <Login
                                                style={{
                                                    width: "300px",
                                                    height: "300px",
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
