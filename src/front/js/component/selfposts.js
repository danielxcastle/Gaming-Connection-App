import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const UserPosts = () => {
    const { store, actions } = useContext(Context);
    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (store && store.accessToken !== undefined && store.user && store.user.id !== undefined) {
                    const response = await fetch(`${store.baseApiUrl}/api/user/${store.user.id}/posts`, {
                        headers: {
                            'Authorization': `Bearer ${store.accessToken}`
                        }
                    });

                    if (response.ok) {
                        const contentType = response.headers.get('content-type');

                        if (contentType && contentType.includes('application/json')) {
                            const userPostsData = await response.json();
                            setUserPosts(userPostsData.posts);
                        } else {
                            console.error('Response is not in JSON format:', contentType);
                        }
                    } else {
                        const errorData = await response.text();
                        console.error('Failed to fetch user posts:', errorData);
                    }
                }
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [store && store.accessToken, store && store.user && store.user.id, store, actions]);

    return (
        <div>
            <h1>User Posts</h1>
            <ul>
                {userPosts.map(post => (
                    <li key={post.id}>
                        <strong>Post ID: {post.id}</strong>
                        <p>User ID: {post.user_id}</p>
                        <strong><h5>Title: {post.title}</h5></strong>
                        <p>Content: {post.content}</p>
                        <p>Created At: {post.created_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPosts;