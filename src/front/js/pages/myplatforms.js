import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const MyPlatforms = () => {
    const { store, actions } = useContext(Context);
    const [userPlatforms, setUserPlatforms] = useState([]);
    const navigate = useNavigate();

    const getPlatformIcon = platformName => {
        switch (platformName) {
            case 'xbox':
                return 'fab fa-xbox';
            case 'playstation':
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
                navigate('/profile');
                // Don't need window.location.reload() here
            } else {
                console.error("Failed to delete platform.");
            }
        } catch (error) {
            console.error('Error deleting platform:', error);
        }
    };

    useEffect(() => {
        let isMounted = true; // Variable to track the mounted state

        const fetchUserPlatforms = async () => {
            try {
<<<<<<< Updated upstream
                if (store && store.accessToken !== undefined && store.user && store.user.id !== undefined) {
                    const response = await fetch(`/api/user/${store.user.id}/platforms`, {
                        headers: {
                            'Authorization': `Bearer ${store.accessToken}`
=======
                const accessToken = store && store.accessToken;
                const userId = store && store.user && store.user.id;

                if (accessToken !== undefined && userId !== undefined) {
                    const response = await fetch(`${store.baseApiUrl}/api/user/${userId}/platforms`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
>>>>>>> Stashed changes
                        }
                    });

                    if (response.ok) {
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            const userPlatformsData = await response.json();

                            // Check if the component is still mounted before updating the state
                            if (isMounted) {
                                setUserPlatforms(userPlatformsData.platforms);
                            }
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

        // Cleanup function to update the mounted state when the component is unmounted
        return () => {
            isMounted = false;
        };
    }, [store && store.accessToken, store && store.user && store.user.id, store.baseApiUrl]);

    return (
        <div className="container">
            <h2>My Platforms</h2>
            <div className="row">
                {userPlatforms.map(platform => (
                    <div className="col-4 my-platforms" key={platform.id}>
                        <center>
                            <h1><i className={getPlatformIcon(platform.platform_name)}></i></h1>
                            <br />
                            <span>{platform.platform_name}</span>
                            <br />
                            <span> - Username: {platform.username}</span>
                            <br />
                            <button onClick={() => handleDeletePlatform(platform.id)}>
                                <i className='fa-solid fa-trash'></i>
                            </button>
                        </center>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPlatforms;
