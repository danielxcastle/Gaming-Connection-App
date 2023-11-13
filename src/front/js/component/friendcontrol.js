import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';

export const FriendActions = ({ friendId, isFriend }) => {
    const [loading, setLoading] = useState(false);
    const { actions } = useContext(Context);

    const handleAddFriend = async () => {
        setLoading(true);
        try {
            await actions.addFriend(friendId);
            // Optionally, you can update your local state or perform any other actions after adding a friend
        } catch (error) {
            console.error('Error adding friend:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFriend = async () => {
        setLoading(true);
        try {
            await actions.deleteFriend(friendId);
            // Optionally, you can update your local state or perform any other actions after deleting a friend
        } catch (error) {
            console.error('Error deleting friend:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {isFriend ? (
                <button onClick={handleDeleteFriend} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete Friend'}
                </button>
            ) : (
                <button onClick={handleAddFriend} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Friend'}
                </button>
            )}
        </div>
    );
};

export default FriendActions;


