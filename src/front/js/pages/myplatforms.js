import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

export const MyPlatforms = () => {
    const { store, actions } = useContext(Context);
    const [userPlatforms, setUserPlatforms] = useState([]);
    const getPlatformIcon = platformName => {
        
        console.log('Platform Name:', platformName);
    
        switch (platformName) {
            case 'Xbox':
                return 'fab fa-xbox'; 
            case 'PlayStation':
                return 'fab fa-playstation'; 
            case 'Nintendo':
                return 'fas fa-gamepad'; 
            case 'Discord':
                return 'fab fa-discord'; 
            case 'Steam':
                return 'fab fa-steam'; 
            case 'Battle.net':
                return 'fab fa-battle-net'; 
            default:
                return ''; 
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
                        console.log('Content Type:', contentType);

                        if (contentType && contentType.includes('application/json')) {
                            const userPlatformsData = await response.json();
                            console.log('User Platforms Data:', userPlatformsData);
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
    console.log('User Platforms:', userPlatforms);


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
