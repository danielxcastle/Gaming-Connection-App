import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const AddPlatform = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        selectedPlatform: '' // A single selected platform
    });

    const allPlatforms = ['xbox', 'playstation', 'nintendo', 'discord', 'steam', 'battleNet'];

    const handleInputChange = event => {
        const { value } = event.target;
        setFormData({ ...formData, selectedPlatform: value });
    };

    useEffect(() => {
        if (store.accessToken === undefined) {
            navigate('/');
        }
    }, [store.accessToken, navigate]);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const user_id = store.user.id; // Ensure that 'user' and 'id' exist in the store and have the correct values

            const platform_name = formData.selectedPlatform || 'Some Platform'; // Default if nothing is selected

            const response = await actions.addPlatform({
                user_id,
                platform_name,
                username: formData.username,
                platforms: [formData.selectedPlatform] // Convert single selection to an array
            });

            if (response.status === 201) {
                navigate('/');
            }
        } catch (error) {
            console.error('Error adding platform:', error);
            console.error('Error details:', error.message);
        }
    };

    return (
        <div>
            <h2>Add User Platform</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h3>Choose Platform:</h3>
                    {allPlatforms.map(platform => (
                        <label key={platform}>
                            <input
                                type="radio"
                                name="platform"
                                value={platform}
                                checked={formData.selectedPlatform === platform}
                                onChange={handleInputChange}
                            />
                            <i className={`fab fa-${platform}`}></i> {/* Font Awesome icon */}
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </label>
                    ))}
                </div>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                    />
                </label>
                <div></div>
                <button type="submit">Add Platform</button>
            </form>
        </div>
    );
};

export default AddPlatform;
