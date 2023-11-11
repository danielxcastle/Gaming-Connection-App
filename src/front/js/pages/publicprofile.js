import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PublicProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const { userId } = useParams();

    useEffect(() => {
        // Fetch the public profile data based on the userId
        const fetchProfileData = async () => {
            try {
                // Assuming you have an action named `fetchProfileByUserId` in your actions
                const response = await actions.fetchProfileByUserId(userId);
                setProfileData(response); // Set the fetched data to the state
            } catch (error) {
                console.error("Error fetching public profile:", error);
                setProfileData(null);
            }
        };

        // Call the fetchProfileData function when the component mounts or the userId changes
        fetchProfileData();
    }, [userId]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    {profileData ? (
                        <>
                            <h1>Public Profile of {profileData.username}</h1>
                            {/* Display other profile information as needed */}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
