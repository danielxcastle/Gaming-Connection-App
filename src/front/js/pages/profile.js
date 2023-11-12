import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import UserPosts from '../component/selfposts';
import NewPost from '../component/newpost';

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showNewPostModal, setShowNewPostModal] = useState(false);

    const toAddPlatform = () => {
        navigate('/addplatform');
    };

    const toMyPlatforms = () => {
        navigate('/myplatforms');
    };

    const toNewPost = () => {
        // Toggle the NewPost modal when "New Post!" is clicked
        setShowNewPostModal((prev) => !prev);
    };

    const closeNewPostModal = () => {
        // Close the NewPost modal
        setShowNewPostModal(false);
    };

    return (
<<<<<<< HEAD
        <div>
=======
        <div className="container">
>>>>>>> daniel
            <button className="btn btn-primary" onClick={toAddPlatform}>
                Add an Account!
            </button>
            <button className="btn btn-primary" onClick={toMyPlatforms}>
                My Associated Accounts
            </button>
            <button className="btn btn-primary" onClick={toNewPost}>
                New Post!
            </button>
            {showNewPostModal && <NewPost onClose={closeNewPostModal} />}
<<<<<<< HEAD
            <UserPosts />
=======
            <center><UserPosts /></center>
>>>>>>> daniel
        </div>
    );
};

export default Profile;
