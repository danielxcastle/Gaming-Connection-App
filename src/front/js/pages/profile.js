import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';
import UserPosts from '../component/selfposts';
import NewPost from '../component/newpost';
import { FriendPosts } from '../component/friendposts';

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
    const toLevels = () => {
        navigate('/levels');
    }

    return (
        <div className="profile-button-container">
            <div className="container">
            <button className="btn profile-btn" onClick={toLevels}>
                View Levels
            </button>
            <button className="btn profile-btn" onClick={toAddPlatform}>
                Add an Account!
            </button>
            <button className="btn profile-btn" onClick={toMyPlatforms}>
                My Associated Accounts
            </button>
            <button className="btn profile-btn" onClick={toNewPost}>
                New Post!
            </button>
            {showNewPostModal && <NewPost onClose={closeNewPostModal} />}
            {/* <center><FriendPosts /></center> */}
            <center><UserPosts /></center>
        </div>
        </div>
    );
};

export default Profile;
