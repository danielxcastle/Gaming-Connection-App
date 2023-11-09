import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

export const MyPlatforms = () => {
    const { store, actions } = useContext(Context);
    const [userPlatforms, setUserPlatforms] = useState([]);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const getPlatformIcon = platformName => {
        switch (platformName) {
            case 'xbox':
                return 'fab fa-xbox';
            case 'playStation':
                return 'fab fa-playstation';
            case 'nintendo':
                return 'fas fa-gamepad';
            case 'discord':
                return 'fab fa-discord';
            case 'steam':
                return 'fab fa-steam';
            case 'battle.net':
                return 'fab fa-battle-net';
            default:
                return '';
        }
    };

    const handleDeletePlatform = async (platformId) => {
        try {
            const response = await actions.deletePlatform(platformId);
            if (response && response.message === "Platform deleted successfully") {
                const updatedPlatforms = await actions.getMyPlatforms();
                setUserPlatforms(updatedPlatforms);
                
                // Navigate to "/profile" after successful deletion
                navigate('/profile');
            } else {
                console.error("Failed to delete platform.");
            }
        } catch (error) {
            console.error('Error deleting platform:', error);
        }
    };

    useEffect(() => {
        const fetchUserPlatforms = async () => {
            try {
                if (store && store.accessToken !== undefined && store.user && store.user.id !== undefined) {
                    const response = await fetch(`${store.baseApiUrl}/api/user/${store.user.id}/platforms`, {
                        headers: {
                            'Authorization': `Bearer ${store.accessToken}`                            
                        }
                    });
                    if (response.ok) {
                        const contentType = response.headers.get('content-type');

                        if (contentType && contentType.includes('application/json')) {
                            const userPlatformsData = await response.json();
                            setUserPlatforms(userPlatformsData.platforms);
                        } else {
                            console.error('Response is not in JSON format:', contentType);
                        }
                    } else {
                        const errorData = await response.text();
                        console.error('Failed to fetch user platforms:', errorData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user platforms:', error);
            }
        };

        fetchUserPlatforms();
    }, [store && store.accessToken, store && store.user && store.user.id, store, actions]);

    return (
        <div>
            <h2>My Platforms</h2>
            <ul>
                {userPlatforms.map(platform => (
                    <li key={platform.id}>
                        <i className={getPlatformIcon(platform.platform_name)}></i>
                        <span>{platform.platform_name}</span>
                        <span> - Username: {platform.username}</span>
                        <button onClick={() => handleDeletePlatform(platform.id)}>
                            <i className='fab fa-trash'></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPlatforms;
