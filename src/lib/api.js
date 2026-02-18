const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

class ApiError extends Error {
  constructor(message, errors = null, status = 500) {
    super(message);
    this.name = "ApiError";
    this.errors = errors;
    this.status = status;
  }
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const requestOptions = {
    ...options,
    headers,
  };

  if (
    requestOptions.body &&
    typeof requestOptions.body === "object" &&
    !(requestOptions.body instanceof FormData)
  ) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, requestOptions);

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload.ok === false) {
    throw new ApiError(payload.message || "Error de servidor", payload.errors || null, response.status);
  }

  return payload;
}

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export { API_BASE_URL, apiRequest, ApiError };
