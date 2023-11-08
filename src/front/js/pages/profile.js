import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const toAddPlatform = () => {
        navigate('/addplatform');
    };
    const toMyPlatforms = () => {
        navigate('/myplatforms');
    };

    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={toAddPlatform}>Add an Account!</button>
            <button
                className="btn btn-primary"
                onClick={toMyPlatforms}>My Associated Accounts</button>
        </div>
    );
};
 export default Profile;