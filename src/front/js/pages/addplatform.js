import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css"
const navigate = useNavigate();

export const AddPlatform = () => {
    const { store, actions } = useContext(Context);
    const [ platform, setPlatform ] = useState("");
    const [ username, setUsername ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await actions.AddPlatform({
                platform_name: platform,
                username: username
            });

            if (response.status === 201) {

                navigate("/"); 
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while signing up.");
            }
        }
    };
    return (
    <div>
        <h2>Add User Platform</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
            </label>
            <div>
                <h3>Choose Platform(s):</h3>
                <label>
                    <input
                        type="checkbox"
                        name="xbox"
                        checked={formData.platformNames.xbox}
                        onChange={handleInputChange}
                    />
                    Xbox
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="playstation"
                        checked={formData.platformNames.playstation}
                        onChange={handleInputChange}
                    />
                    Playstation
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="nintendo"
                        checked={formData.platformNames.nintendo}
                        onChange={handleInputChange}
                    />
                    Nintendo
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="discord"
                        checked={formData.platformNames.discord}
                        onChange={handleInputChange}
                    />
                    Discord
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="steam"
                        checked={formData.platformNames.steam}
                        onChange={handleInputChange}
                    />
                    Steam
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="battleNet"
                        checked={formData.platformNames.battleNet}
                        onChange={handleInputChange}
                    />
                    Battle.net
                </label>
            </div>
            <button type="submit">Add Platform</button>
        </form>
        </div>
    )

}