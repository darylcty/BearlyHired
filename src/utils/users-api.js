import sendRequest from "./send-request";
const BASE_URL = "/api/users";


export async function signUp(formData) {
	return sendRequest(BASE_URL, "POST", formData);
}

export async function login(credentials) {
	return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

export function checkToken() {
	return sendRequest(`${BASE_URL}/check-token`)
}