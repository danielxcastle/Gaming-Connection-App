import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const LoggedIn = (props) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        await actions.logOut();
        localStorage.clear();
        navigate('/');
    };

    const onPlatforms = (event) => {
        navigate('/myplatforms');
    };

    const onProfile = (event) => {
        navigate('/profile');
    };

    return (
        <div className="logged-in-container">
            <div>
                <img
                    src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                    className="profile-pic"
                    alt="User Profile"
                />
            </div>
            <div>
                <h6>{"Welcome " + store?.user?.username + "!"}</h6>
            </div>
            <div className="button-group">
                <div>
                    <button
                        onClick={onPlatforms}
                        className="btn login-btn"
                    >
                        My Platforms!
                    </button>
                </div>
                <div>
                    <button
                        className="btn login-btn"
                        onClick={onProfile}
                    >
                        View Profile
                    </button>
                </div>
            </div>
            <div>
                <button
                    className="btn login-btn"
                    onClick={onSubmit}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};