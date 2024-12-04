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
export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username,email,password }),
  });

  if (res.ok) {
    const data = await res.json();
    // Store tokens in cookies
    return data;
  } else {
    throw new Error("register failed");
  }
}
export async function convert(videoUrl:string){
  const token = Cookies.get("accessToken");

  if (!token) {
    throw new Error("User is not authenticated");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/convert-video/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ video_url: videoUrl }), // Make sure the structure here is what the backend expects
  });
  
  if (res.ok) {
    const data = await res.json();
    return data.converted_text;
  } else {
    const errorText = await res.text(); // Get more details from the response if it's an error
    throw new Error(`Failed to convert video: ${errorText}`);
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