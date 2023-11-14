
const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			baseApiUrl: baseApiUrl,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			accessToken: undefined,
			user: undefined,
			platforms: [],
			userPlatforms: [],
			baseApiUrl: baseApiUrl,
			friends: []
		},


		actions: {

			logIn: async ({ email, hashed_password }) => {
				const response = await fetch(
					`${baseApiUrl}/api/log-in`, {
					method: "POST",
					body: JSON.stringify({
						email: email,
						hashed_password: hashed_password,
					}),
					headers: {
						"Content-Type": "application/json"
					}
				}
				)
				const body = await response.json();
				if (response.ok) {
					setStore({
						accessToken: body.access_token,
						user: body.user
					});
					console.log(body.user)
					localStorage.setItem("accessToken", body.access_token);
					localStorage.setItem("user", JSON.stringify(body.user));
					return true
				}
			}

			,


			logOut: () => {
				setStore({
					accessToken: undefined,
					user: undefined,
				});

				localStorage.removeItem("accessToken");
				localStorage.removeItem("user");

			},
			signUp: async ({ username, email, password }) => {
				const response = await fetch(`${baseApiUrl}/api/sign-up`, {
					method: "POST",
					body: JSON.stringify({
						username: username,
						email: email,
						hashed_password: password  // Change 'password' to 'hashed_password'
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
			
				if (response.ok) {
					const body = await response.json();
					setStore({
						accessToken: body.access_token,
						user: body.user,
					});
			
					localStorage.setItem("accessToken", body.access_token);
					localStorage.setItem("user", JSON.stringify(body.user));
				}
			
				return response;
			},
			
			loadSomeData: () => {
				fetch("www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
					.then((response) => response.json())
					.then((data) => {
						console.log(data)
						setStore({ cocktails: data.results })
					})
			},


			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })				
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				const store = getStore();


				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});


				setStore({ demo: demo });
			},
			addPlatform: async ({ user_id, platform_name, username }) => {

				try {
					const response = await fetch(`${baseApiUrl}/api/add-platform/${user_id}`, {
                        method: 'POST',
                        body: JSON.stringify({ user_id, platform_name, username }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    if (response.ok) {
                        
                        const updatedPlatforms = await actions.getUserPlatforms();
                        setStore({ platforms: updatedPlatforms });
                        return response.json();
                    }
                    throw new Error('Failed to add platform');
                } catch (error) {
                    console.error('Error adding platform:', error);
                    throw error;
                }

				
			},
			getMyPlatforms: async () => {
				try {
					const response = await fetch(`${baseApiUrl}/api/user/${user.id}/platforms`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
						}
					});
			
					if (response.ok) {
						const platforms = await response.json();
						setStore({ userPlatforms: platforms });
						return platforms;
					}
					throw new Error('Failed to fetch user platforms');
				} catch (error) {
					console.error('Error fetching user platforms:', error);
					throw error;
				}
			},
			


            
            deletePlatform: async (platform_id) => {
                try {
                    const response = await fetch(`${baseApiUrl}/api/delete-platform/${platform_id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to delete platform');
                } catch (error) {
                    console.error('Error deleting platform:', error);
                    throw error;
                }
            },

            // New action to rename a platform
            renamePlatform: async (platform_id, newPlatformName) => {
                try {
                    const response = await fetch(`${baseApiUrl}/api/rename-platform/${platform_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ new_platform_name: newPlatformName }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to rename platform');
                } catch (error) {
                    console.error('Error renaming platform:', error);
                    throw error;
                }
            },
			// Update the `searchByUsername` function to fetch users by their username
			searchByUsername: async (username) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/search-user?username=${username}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							// Add any necessary headers like authorization headers if required
						}
					});
			
					if (!response.ok) {
						throw new Error('Network response was not ok.');
					}
			
					const data = await response.json();
					return data; // This return statement is optional, based on your use case
				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},
			createPost: async (postData) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/new-post`, {
						method: 'POST',
						body: JSON.stringify(postData),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
						}
					});
			
					if (response.ok) {
						return response.json();
					}
			
					// Handle specific error cases
					if (response.status === 401) {
						throw new Error('Unauthorized: Please log in');
					} else if (response.status === 403) {
						throw new Error('Forbidden: You do not have permission to create a post');
					}
			
					const errorData = await response.json();
					throw new Error(`Failed to create a new post: ${errorData.message}`);
				} catch (error) {
					console.error('Error creating a new post:', error);
					throw error;
				}
			},
			searchByUsername: async (username) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/search-user?username=${username}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							// Add any necessary headers like authorization headers if required
						}
					});
			
					if (!response.ok) {
						throw new Error('Network response was not ok.');
					}
			
					const data = await response.json();
					return data; // This return statement is optional, based on your use case
				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},
			getUserPosts: async (user_id) => {
				try {
				  const response = await fetch(`${baseApiUrl}/api/user/${user_id}/posts`, {
					method: 'GET',
					headers: {
					  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
					}
				  });
			  
				  if (response.ok) {
					const posts = await response.json();
					console.log("User posts:", posts); // Log the response
					return posts;
				  }
			  
				  throw new Error('Failed to fetch user posts');
				} catch (error) {
				  console.error('Error fetching user posts:', error);
				  throw error;
				}

			  },
			  addFriend: async (friendId) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/add-friend/${friendId}`, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
						}
					});
			
					if (response.ok) {
						return response.json();
					}
			
					throw new Error('Failed to add friend');
				} catch (error) {
					console.error('Error adding friend:', error);
					throw error;
				}
			},


            deleteFriend: async (friendId) => {
                try {
                    const response = await fetch(`${baseApiUrl}/api/delete-friend/${friendId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        }
                    });

                    if (response.ok) {
                        return response.json();
                    }

                    throw new Error('Failed to delete friend');
                } catch (error) {
                    console.error('Error deleting friend:', error);
                    throw error;
                }
            },
			// Inside actions object in getState function in appContext.js
			getUser: async (userId) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/user/${userId}`);
					if (response.ok) {
						const userData = await response.json();
						
						// Log the current store state before updating
						console.log('Store state before setting user:', getStore());
			
						setStore({ user: userData });
			
						// Log the current store state after updating
						console.log('Store state after setting user:', getStore());
			
						return userData;
					}
					throw new Error('Failed to fetch user data');
				} catch (error) {
					console.error('Error fetching user data:', error);
					throw error;
				}
			},

			getFriends: async (userId) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/user/${userId}/friends`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
						}
					});
					if (response.ok) {
						const friendsData = await response.json();
						setStore({ friends: friendsData.friends });
						return friendsData.friends;
					}
					throw new Error('Failed to fetch user friends');
				} catch (error) {
					console.error('Error fetching user friends:', error);
					throw error;
			
				}
			},
			getFriendPosts: async (userId, friendId) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/user/${userId}/friend-posts/${friendId}`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
						}
					});
			
					if (response.ok) {
						return response.json();
					}
			
					throw new Error('Failed to fetch friend posts');
				} catch (error) {
					console.error('Error fetching friend posts:', error);
					throw error;
				}
			},
			getUserFriendPosts: async (userId) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/user/${userId}`);
					if (response.ok) {
						// Check if the response is valid JSON
						const contentType = response.headers.get('content-type');
						if (contentType && contentType.includes('application/json')) {
							const userData = await response.json();
			
							// Log the current store state before updating
							console.log('Store state before setting user:', getStore());
			
							setStore({ user: userData });
			
							// Log the current store state after updating
							console.log('Store state after setting user:', getStore());
			
							return userData;
						} else {
							// Log the raw response if it's not valid JSON
							console.error('Invalid JSON response:', response);
						}
					}
					throw new Error('Failed to fetch user data');
				} catch (error) {
					console.error('Error fetching user data:', error);
					throw error;
				}
			},
			



		}
	};
};

export default getState;