
const baseApiUrl = process.env.BACKEND_URL || "http://127.0.0.1:3001";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			user: undefined
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
			signUp: async ({ username, email, hashed_password }) => {
				const response = await fetch(`${baseApiUrl}/api/sign-up`, {
					method: "POST",
					body: JSON.stringify({
						username: username,
						email: email,
						hashed_password: hashed_password
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
						// always console log first
						console.log(data)
						setStore({ cocktails: data.results })
					})
			},


			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			addPlatform: async ({ user_id, platform_name, username }) => {
				try {
					const response = await fetch(`${baseApiUrl}/api/add-platform/${user_id}`, {
						method: 'POST',
						body: JSON.stringify({ user_id, platform_name, username }), // Adjusted here
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
						}
					});
			
					if (response.ok) {
						const responseBody = await response.json();

						return responseBody;
					}
					throw new Error('Failed to add platform');
				} catch (error) {
					console.error('Error adding platform:', error);
					throw error;
				}
			},
			

            // New action to delete a platform
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
            }
		}
	};
};

export default getState;