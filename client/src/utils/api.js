import { useAuth } from "../context/AuthContext";

export function apiRequest(url, method = "GET", body = null, token) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) options.body = JSON.stringify(body);

  return fetch(url, options).then(async (res) => {
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || "API error");
    }

    return data;
  });
}
