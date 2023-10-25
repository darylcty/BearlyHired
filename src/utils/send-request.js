import { getToken } from "./users-service";
export default async function sendRequest(
	endpoint,
	method = "GET",
	payload = null
) {
	const options = { method };
	if (payload) {
		options.headers = { "Content-Type": "application/json" };
		options.body = JSON.stringify(payload);
	}
	const token = getToken();
	if (token) {
		options.headers = options.headers || {};
		options.headers.Authorization = `Bearer ${token}`;
	}

	const response = await fetch(endpoint, options);
    if (!response.ok) {
        throw new Error(`Failed ${method} request: ${await response.text()}`);
    }
    return await response.json();
}
