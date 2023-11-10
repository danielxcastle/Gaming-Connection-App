// Profile.js
import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import UserPosts from '../component/selfposts';


export const Profile = (user) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const toAddPlatform = () => {
        navigate('/addplatform');
    };
    const toMyPlatforms = () => {
        navigate('/myplatforms');
    };
    const toNewPost = () => {
        navigate('/newpost');
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={toAddPlatform}>
                Add an Account!
            </button>
            <button className="btn btn-primary" onClick={toMyPlatforms}>
                My Associated Accounts
            </button>
            <button className="btn btn-primary" onClick={toNewPost}>
                New Post!
            </button>

            <UserPosts />
        </div>
    );
};

export default Profile;
