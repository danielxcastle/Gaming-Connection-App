import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const toAddPlatform = () => {
        navigate('/addplatform');
    };

    return (
        <button
            className="btn btn-primary"
            onClick={toAddPlatform}>Add an Account!</button>
    );
};
