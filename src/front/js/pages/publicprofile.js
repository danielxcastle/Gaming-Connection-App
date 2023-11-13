import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import FriendActions from '../component/friendcontrol';

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const location = useLocation();
    const { userId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await actions.getUser(userId);
                console.log('User data in UserProfile component:', userData);
                const friendsData = await actions.getFriends(userId);
                console.log('Friends data in UserProfile component:', friendsData);
            } catch (error) {
                console.error('Error fetching data in UserProfile component:', error);
            }
        };
    
        fetchData();
    }, [actions, userId]);

    return (
        <div>
            <h1>User Profile</h1>

            {/* Check if user data is available before rendering */}
            {store.user ? (
                <>
                    <p>Username: {store.user.username}</p>
                    <p>Email: {store.user.email}</p>
                </>
            ) : (
                <p>Loading user data...</p>
            )}
            <FriendActions />

            <h2>Friends</h2>
            <ul>
                {store.friends?.map(friend => (
                    <li key={friend.id}>{friend.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
