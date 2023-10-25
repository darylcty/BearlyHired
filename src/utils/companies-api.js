const BASE_URL = "/api/companies";

export async function create(inputCompanyData) {
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

export async function getAll() {
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Invalid Company Get");
    }
}

export async function getOne(companyId) {
    const response = await fetch(`${BASE_URL}/${companyId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Invalid Company Get");
    }
}

export async function update(companyId, inputCompanyData) {
    const response = await fetch(`${BASE_URL}/${companyId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputCompanyData),
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Invalid Company Update");
    }
}

export async function deleteOne(companyId) {
    const response = await fetch(`${BASE_URL}/${companyId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error("Invalid Company Delete");
    }
}
// export async function checkToken() {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`${BASE_URL}/check-token`, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     if (response.ok) {
//         return await response.json();
//     } else {
//         throw new Error();
//     }
// }