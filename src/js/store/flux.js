const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			comments: [],
			users: [],
			session: {}
		},
		actions: {
			// Use getActions to call a function within a fuction exampleFunction: () => { getActions().changeColor(0, "green"); },
			logout(history) {
				setStore({ session: {} });
				history.push("/");
			},
			signIn(hash, history) {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({ hash: hash });

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					mode: "cors",
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.API_BASE_URL + "/signIn", requestOptions)
					.then(response => {
						switch (response.status) {
							case 200:
								return response.json();
							case 401:
								throw new Error("Wrong password try again");
							case 404:
								throw new Error("User not exist try Register first");
							default:
								throw new Error("Something contact customer support");
						}
					})
					.then(result => {
						setStore({ session: result });
						history.push("/wall");
					})
					.catch(error => alert(error));
			},
			sendRegister(hash, history) {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({ hash: hash });

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					mode: "cors",
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.API_BASE_URL + "/signUp", requestOptions)
					.then(response => {
						if (response.status == 200) {
							history.push("/");
						} else {
							alert("There is something wrong");
						}
					})
					.catch(error => console.log("error", error));
			},
			sendComment(hash) {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({ comment: hash });
				console.log(raw);

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					mode: "cors",
					body: raw,
					redirect: "follow"
				};

				fetch(process.env.API_BASE_URL + "/comment", requestOptions)
					.then(response => {
						if (response.status == 200) {
							getActions().getComments();
						}
						return response.text();
					})
					.then(result => console.log(result))
					.catch(error => console.log("error", error));
			},
			getComments() {
				var requestOptions = {
					method: "GET",
					mode: "cors",
					redirect: "follow"
				};

				fetch(process.env.API_BASE_URL + "/getComments", requestOptions)
					.then(response => response.json())
					.then(result => setStore({ comments: result.msg }))
					.catch(error => console.log("error", error));
			},
			getUsers() {
				var requestOptions = {
					method: "GET",
					mode: "cors",
					redirect: "follow"
				};

				fetch(process.env.API_BASE_URL + "/getUsers", requestOptions)
					.then(response => response.json())
					.then(result => setStore({ users: result.msg }))
					.catch(error => console.log("error", error));
			}
		}
	};
};

export default getState;
