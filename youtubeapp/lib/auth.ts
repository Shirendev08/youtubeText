import Cookies from "js-cookie";

export async function login(username: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    const data = await res.json();
    // Store tokens in cookies
    Cookies.set("accessToken", data.access);
    Cookies.set("refreshToken", data.refresh);

    return data;
  } else {
    throw new Error("Login failed");
  }
}


export function logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }


export async function history() {
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversion-history/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json();
    return data.history;  // Returning the history data array
  } else {
    throw new Error("Failed to fetch conversion history");
  }
}  