// Import necessary React modules
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

// Define the NewPost component
export const NewPost = () => {
    // State hooks for title and content
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Get actions from the app context
    const { actions } = useContext(Context);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the createPost action with the form data
            await actions.createPost({ title, content });

            // Clear the form after successful submission
            setTitle("");
            setContent("");
        } catch (error) {
            console.error("Error creating a new post:", error);
        }
    };

    // Return JSX for the NewPost component
    return (
        <div className="row">
            <div className="col-12">
                <form onSubmit={handleSubmit} className="new-post">
                <h1>New Post</h1>
                    <label>
                        Title:
                        <input type="text" className="new-post-input" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <br />
                    <label>
                        Content:
                        <textarea value={content} className="new-post-input" rows={3} onChange={(e) => setContent(e.target.value)} />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

// Export the NewPost component
export default NewPost;
