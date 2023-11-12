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

    const allPlatforms = ['xbox', 'playstation', 'nintendo', 'discord', 'steam', 'battle.net'];

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
            const user_id = store.user.id;

            const platform_name = formData.selectedPlatform || 'Some Platform';

            const response = await actions.addPlatform({
                user_id,
                platform_name,
                username: formData.username,
                platforms: [formData.selectedPlatform]
            });

            if (response.status === 201) {
                navigate('/profile');
            }
        } catch (error) {
            console.error('Error adding platform:', error);
            console.error('Error details:', error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
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
                                    <i className={formData.selectedPlatform === "nintendo" ? 'fa-solid fa-gamepad' : `fab fa-${platform}`}></i>
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
            </div>
        </div>
    );
};

export default AddPlatform;
