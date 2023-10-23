import * as usersAPI from "./users-api";

export async function signUp(inputData) {
	const { name, email, password } = inputData;
	const formData = { name, email, password };
	const token = await usersAPI.signUp(formData);
	localStorage.setItem("token", token);
	return getUser();
}

export function getToken() {
	const token = localStorage.getItem("token");
	if (!token) {
		// if no token, return null
		return null;
	}
	// obtain payload from token by splitting it  at "."
	const payload = JSON.parse(atob(token.split(".")[1]));
	// converting JWT expiry to seconds
	if (payload.exp < Date.now() / 1000) {
		// if token expires, remove token from local storage
		localStorage.removeItem("token");
		return null;
	}
	return token;
}

export function getUser() {
	const token = getToken();
	// if there is a token, return user in payload. otherwise, return null
	return token ? JSON.parse(atob(token.split(".")[1])).user : null;
}

export function logOut() {
	localStorage.removeItem("token");
}

export async function login(credentials) {
	try {

		const token = await  usersAPI.login(credentials);
		localStorage.setItem("token", token);
		return getUser();
	} catch (error) {
		throw new Error("Log In Failed.");
	}
}

export function checkToken() {
	return (
		usersAPI.checkToken().then((dateStr) => new Date(dateStr))
	)
}