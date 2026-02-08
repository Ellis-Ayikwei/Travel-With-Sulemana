import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Force relative path for Next.js API routes - ignore any env variables
// This ensures we always use the Next.js API routes, not external backends
const API_BASE = "/api";

// Create axios instance with hardcoded relative path
// This ensures we NEVER use external backend URLs
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api", // Hardcoded - never use env variables
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token and ensure correct base URL
axiosInstance.interceptors.request.use(
  (config) => {
    // Force relative path - override any full URLs
    if (config.url && config.url.startsWith("http")) {
      // Extract path from full URL if somehow a full URL got through
      const url = new URL(config.url);
      config.url = url.pathname;
    }
    
    // Ensure baseURL is always relative
    config.baseURL = "/api";
    
    // Debug log (remove in production)
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("API Request:", config.method?.toUpperCase(), config.baseURL + config.url);
    }
    
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens on unauthorized
      clearAuthTokens();
      // Optionally redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("campusride_access_token");
}

export function setAuthTokens(access: string, refresh?: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("campusride_access_token", access);
  if (refresh) localStorage.setItem("campusride_refresh_token", refresh);
}

export function clearAuthTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("campusride_access_token");
  localStorage.removeItem("campusride_refresh_token");
}

// Generic API fetch function using axios
export async function apiFetch<T = any>(
  path: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const { method = "GET", data, headers = {}, ...rest } = options;
  
  const response = await axiosInstance.request<T>({
    url: path,
    method,
    data,
    headers,
    ...rest,
  });

  return response.data;
}

export const AuthAPI = {
  login: async (emailOrPhone: string, password: string) => {
    // Use Next.js API route - build URL from current page origin
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/api/auth/login`;
    
    // Debug: Log the actual URL being called
    if (typeof window !== "undefined") {
      console.log("🔵 Login API URL:", url);
      console.log("🔵 Current origin:", origin);
    }
    
    const response = await axios.post<{ access: string; refresh: string; user: any }>(
      url,
      {
        email: emailOrPhone,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      access: response.data.access,
      refresh: response.data.refresh,
      user: response.data.user || {},
    };
  },

  register: async (payload: any) => {
    // Use Next.js API route - ensure relative URL is used
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/api/auth/register`;
    
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

// Export axios instance for direct use if needed
export default axiosInstance;
