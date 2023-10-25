const BASE_URL = "/api/users";
export async function signUp(inputData) {
	const response = await fetch(BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(inputData),
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error("Invalid Sign up");
	}
}

export async function login(credentials) {
	const response = await fetch(`${BASE_URL}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error("Invalid Login");
	}
}

export async function checkToken() {
	const token = localStorage.getItem("token");
	const response = await fetch(`${BASE_URL}/check-token`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error();
	}
}
