import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { getAuthToken } from "@/utils";

type CustomAxiosConfig = AxiosRequestConfig & {
  withAuth?: boolean;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_TS_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { withAuth?: boolean }) => {
    if (config.withAuth) {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(
        `API Error [${error.response.status}]:`,
        error.response.data,
      );
    } else {
      console.error("API Network Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export const apiService = {
  get: async <T>(
    url: string,
    config: CustomAxiosConfig = { withAuth: true },
  ): Promise<T> => {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  },

  post: async <T, B = unknown>(
    url: string,
    body: B,
    config: CustomAxiosConfig = { withAuth: true },
  ): Promise<T> => {
    const response = await apiClient.post<T>(url, body, config);
    return response.data;
  },

  put: async <T, B = unknown>(
    url: string,
    body: B,
    config: CustomAxiosConfig = { withAuth: true },
  ): Promise<T> => {
    const response = await apiClient.put<T>(url, body, config);
    return response.data;
  },

  delete: async <T>(
    url: string,
    config: CustomAxiosConfig = { withAuth: true },
  ): Promise<T> => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};
