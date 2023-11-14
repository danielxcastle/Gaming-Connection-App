// import React, { useEffect, useState, useContext } from 'react';
// import { Context } from '../store/appContext';
// import { useParams } from 'react-router-dom';

// export const FriendPosts = ({ friendId }) => {
//     const [friendPosts, setFriendPosts] = useState([]);
//     const { actions } = useContext(Context);

//     useEffect(() => {
//         const fetchFriendPosts = async () => {
//             try {
//                 // Log user information to check if it's resolving correctly
//                 console.log('User:', actions.getUserFriendPosts());

//                 // Log friendId to check if it's resolving correctly
//                 console.log('Friend ID:', friendId);

//                 // Use the new Flux action to get friend posts
//                 const response = await actions.getFriendPosts(actions.getUser().id, friendId);

//                 // Update the state with friend's posts
//                 setFriendPosts(response.posts);
//             } catch (error) {
//                 console.error('Error fetching friend posts:', error);
//                 // Handle error if needed
//             }
//         };

//         // Fetch friend's posts when the component mounts
//         fetchFriendPosts();
//     }, [friendId, actions]);
    
//     return (
//         <div className="friend-posts">
//             <h2>Friend's Posts</h2>
//             {friendPosts.map((post) => (
//                 <div key={post.id} className="post">
//                     <h3>{post.title}</h3>
//                     <p>{post.content}</p>
//                     <p>Posted on: {post.created_at}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };
