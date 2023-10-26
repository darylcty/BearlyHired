const BASE_URL = "/api/companies";
import sendRequest from "./send-request";

export async function createCompany(inputCompanyData) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {  
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputCompanyData),
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Invalid Company Creation");
    }
}

export async function getAllCompanies() {
    return sendRequest(`${BASE_URL}`);
}

export async function getOneCompany(companyId) {
    return sendRequest(`${BASE_URL}/${companyId}`);
}
export async function updateCompany(companyId, inputCompanyData) {
    return sendRequest(`${BASE_URL}/${companyId}`, "PATCH", inputCompanyData);
}

export async function deleteOneCompany(companyId) {
    return sendRequest(`${BASE_URL}/${companyId}`, "DELETE");
}