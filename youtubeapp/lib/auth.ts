// lib/auth.js
export async function login(username: string , password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.access);   // Store tokens in localStorage (or cookies)
        localStorage.setItem('refreshToken', data.refresh);
        return data;
    } else {
        throw new Error('Login failed');
    }
}
