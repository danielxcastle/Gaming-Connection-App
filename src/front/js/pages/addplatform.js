import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const AddPlatform = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        selectedPlatforms: [] // An array to hold multiple selected platforms
    });

    const handleInputChange = event => {
        const { name, checked } = event.target;

        if (checked) {
            setFormData(prevData => ({
                ...prevData,
                selectedPlatforms: [...prevData.selectedPlatforms, name]
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                selectedPlatforms: prevData.selectedPlatforms.filter(platform => platform !== name)
            }));
        }
    };

    useEffect(() => {
        if (store.accessToken === undefined) {
            navigate('/');
        }
    }, [store.accessToken, navigate]);
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            // Fetch the user_id from the context or wherever you store it
            const user_id = store.user.id; // Ensure that 'user' and 'id' exist in the store and have the correct values
            const response = await actions.addPlatform({
                user_id,
                platform_name: 'Some Platform',
                username: formData.username,
                platforms: formData.selectedPlatforms
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
                <label>
                    <input
                        type="checkbox"
                        name="xbox"
                        checked={formData.selectedPlatforms.includes("xbox")}
                        onChange={handleInputChange}
                    />
                    <i className="fab fa-xbox"></i> Xbox
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="playstation"
                        checked={formData.selectedPlatforms.includes("playstation")}
                        onChange={handleInputChange}
                    />
                    <i className="fab fa-playstation"></i> PlayStation
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="nintendo"
                        checked={formData.selectedPlatforms.includes("nintendo")}
                        onChange={handleInputChange}
                    />
                    <i className="fas fa-gamepad"></i> Nintendo
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="discord"
                        checked={formData.selectedPlatforms.includes("discord")}
                        onChange={handleInputChange}
                    />
                    <i className="fab fa-discord"></i> Discord
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="steam"
                        checked={formData.selectedPlatforms.includes("steam")}
                        onChange={handleInputChange}
                    />
                    <i className="fab fa-steam"></i> Steam
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="battleNet"
                        checked={formData.selectedPlatforms.includes("battleNet")}
                        onChange={handleInputChange}
                    />
                    <i className="fab fa-battle-net"></i> Battle.net
                </label>
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
// ...

// ...

};

export default AddPlatform;