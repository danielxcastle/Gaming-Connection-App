import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <nav className="navbar game-nav">
            <div className="container navbar-container">
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

                    <div className="col-4">
                        <button
                            onClick={toggleDropdown}
                            className="dropbtn menu-button ml-auto "
                        >
                            Menu
                        </button>
                        {dropdownOpen && (
                            <div className="dropdown-content ml-auto">
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