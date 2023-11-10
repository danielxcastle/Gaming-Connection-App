import React, { useContext, useState } from "react";
import { useStoreActions } from "../../js/store/flux"; // Import the createPost action
import { Context } from "../store/appContext";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { actions } = useContext(Context);

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

    return (
        <div>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <br />
                <label>
                    Content:
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewPost;
