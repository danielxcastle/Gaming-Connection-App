import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

export const MyPlatforms = () => {
    const { store } = useContext(Context);
    const [userPlatforms, setUserPlatforms] = useState([]);

    useEffect(() => {
        const fetchUserPlatforms = async () => {
            try {
                if (store && store.accessToken !== undefined && store.user && store.user.id !== undefined) {
                    const response = await fetch(`/api/user/${store.user.id}/platforms`, {
                        headers: {
                            "Authorization": `Bearer ${store.accessToken}`,
                            "content-type": 'application/json'
                            // Add other headers as needed
                        }
                    });
                    console.log(response); 
                    if (response.ok) {
                        const userPlatformsData = await response.json();
                        setUserPlatforms(userPlatformsData.platforms);
                    } else {
                        throw new Error('Failed to fetch user platforms');
                    }
                }
            } catch (error) {
                console.error('Error fetching user platforms:', error);
            }
        };

        fetchUserPlatforms();
    }, [store && store.accessToken, store && store.user && store.user.id]);


    const getPlatformIcon = platformName => {
        switch (platformName) {
            case 'Xbox':
                return 'fab fa-xbox'; // Replace with actual Font Awesome class for Xbox
            case 'PlayStation':
                return 'fab fa-playstation'; // Replace with actual Font Awesome class for PlayStation
            case 'Nintendo':
                return 'fas fa-gamepad'; // Replace with actual Font Awesome class for Nintendo
            case 'Discord':
                return 'fab fa-discord'; // Replace with actual Font Awesome class for Discord
            case 'Steam':
                return 'fab fa-steam'; // Replace with actual Font Awesome class for Steam
            case 'Battle.net':
                return 'fab fa-battle-net'; // Replace with actual Font Awesome class for Battle.net
            default:
                return '';
        }
    };

    return (
        <div>
            <h2>My Platforms</h2>
            <ul>
                {userPlatforms.map(platform => (
                    <li key={platform.id}>
                        <i className={getPlatformIcon(platform.platform_name)}></i>
                        <span>{platform.platform_name}</span>
                        <span> - Username: {platform.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyPlatforms;
