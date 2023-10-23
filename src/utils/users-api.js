import sendRequest from "./send-request";
const BASE_URL = "/api/users";


export async function signUp(formData) {
	const response = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error("Invalid Sign up");
	}
}


export async function login(credentials) {
	return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
	return sendRequest(`${BASE_URL}/check-token`)
}