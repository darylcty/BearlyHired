import { getToken } from "./users-service";
export default async function defaultGetSendRequest(
	url,
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

	const res = await fetch(url, options);
	if (res.ok) return res.json();
	else {
		const errorResponse = await res.json().catch(() => "Unknown Error");
		throw new Error(errorResponse);
	}
}
