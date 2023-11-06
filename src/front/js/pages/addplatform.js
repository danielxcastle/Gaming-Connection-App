import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css"
const navigate = useNavigate();

export const AddPlatform = () => {
    const { store, actions } = useContext(Context);
    const [ platform, setPlatform ] = useState("");
    const [ username, setUsername ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await actions.AddPlatform({
                platform_name: platform,
                username: username
            });

            if (response.status === 201) {

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
        <div className="container">
            
        </div>
    )

}