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
        <nav className="navbar navbar-expand-lg game-nav">
            <div className="container-fluid">
                <a className="navbar-brand" href="#" onClick={onHome}>
                    <img
                        src={logo}
                        alt="Logo"
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                    />
                   
                </a>

                <div className="d-flex flex-grow-1 justify-content-center">
                    <SearchUser />
                </div>

                <div className="d-flex align-items-center">
                    <button
                        onClick={toggleDropdown}
                        className="btn menu-button"
                    >
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
        </nav>
    );
};
