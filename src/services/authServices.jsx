const API_URL = "http://localhost:8080/auth";

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data.token;
}

export function logout() {
    localStorage.removeItem("token");
}

export function getToken() {
    return localStorage.getItem("token");
}

export function isAuthenticated() {
    return !!getToken();
}
