// lib/fetchWithAuth.js
export async function fetchWithAuth(url:string, options : RequestInit = {}) {
    const token = localStorage.getItem('accessToken');

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        // If the access token is expired, refresh it
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshRes.ok) {
            const refreshData = await refreshRes.json();
            localStorage.setItem('accessToken', refreshData.access);
            // Retry the original request with the new token
            return fetchWithAuth(url, options);
        } else {
            throw new Error('Session expired, please log in again');
        }
    }

    return res;
}
