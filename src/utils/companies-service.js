import * as companiesAPI from "./companies-api";

export async function create(inputCompanyData) {
	const { companyName, companyLocation, country, industry  } = inputCompanyData;
	const companyFormData = { companyName, companyLocation, country, industry };

    try {
        const response = await companiesAPI.create(companyFormData);
        return response;
    } catch (error) {
        throw new Error("Could Not Create Company");
    }
}

export async function getAll() {
    try {
        const response = await companiesAPI.getAll();
        return response;
    } catch (error) {
        throw new Error("Could Not Get Companies");
    }
}

export async function getOne(companyId) {
    try {
        const response = await companiesAPI.getOne(companyId);
        return response;
    } catch (error) {
        throw new Error("Could Not Get Company");
    }
}

export async function update(companyId, inputCompanyData) {
    const { companyName, companyLocation, country, industry  } = inputCompanyData;
    const companyFormData = { companyName, companyLocation, country, industry };

    try {
        const response = await companiesAPI.update(companyId, companyFormData);
        return response;
    } catch (error) {
        throw new Error("Could Not Update Company");
    }
}
export async function deleteOne(companyId) {
    try {
        const response = await companiesAPI.deleteOne(companyId);
        return response;
    } catch (error) {
        throw new Error("Could Not Delete Company");
    }
}
// export function getToken() {
// 	const token = localStorage.getItem("token");
// 	if (!token) {
// 		// if no token, return null
// 		return null;
// 	}
// 	// obtain payload from token by splitting it  at "."
// 	const payload = JSON.parse(atob(token.split(".")[1]));
// 	console.log(payload);
// 	// converting JWT expiry to seconds
// 	if (payload.exp < Date.now() / 1000) {
// 		// if token expires, remove token from local storage
// 		localStorage.removeItem("token");
// 		return null;
// 	}
// 	return token;
// }
// export function checkToken() {
// 	return (
// 		companiesAPI.checkToken().then((dateStr) => new Date(dateStr))
// 	)
// }