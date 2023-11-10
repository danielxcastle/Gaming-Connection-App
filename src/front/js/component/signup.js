import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

export const SignUp = ({ onClose }) => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await actions.signUp({
                username: username,
                email: email,
                password: password  // Change 'hashed_password' to 'password'
            });
    
            if (response.status === 201) {
                onClose(); 
                navigate("/"); 
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while signing up.");
            }
        }
    };
    
    return (
        <div className="signup-modal-overlay">
            <div className="signup-modal">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Sign Up</h2>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
                <form onSubmit={onSubmit}>
                    <input
                        className="form-control m-3"
                        type="username"
                        value={username}
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)} 
                    ></input>
                    <input
                        className="form-control m-3"
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>

                    <input
                        className="form-control m-3"
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};
