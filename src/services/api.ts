import { endpoint } from "@/constants/endpoint";
import axios from "axios";
import { StorageService } from "./storage-service";
import get from "lodash/get";
import { API_CODE, API_MESSAGE_KEY } from "@/constants/apicode";

const api = axios.create({
  baseURL: endpoint.baseURL,
});

api.interceptors.request.use((config) => {
  const token = StorageService.getToken();
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (axios.isAxiosError(error)) {
      const statusCode = get(error, "response.status");
      const message = get(error, "response.message");

      if (
        statusCode === API_CODE.UNAUTHORIZED ||
        (statusCode === API_CODE.FORBIDDEN &&
          message.includes(API_MESSAGE_KEY.TOKEN_INVALID))
      ) {
        StorageService.clearAndRedirect();
      }
    }

    if (
      error?.response.status &&
      error?.response.status >= 400 &&
      error?.response.status < 500
    ) {
      const errorMessage = error?.response.data.message || "Something wrong";
      const customErr = new Error(errorMessage);
      customErr.name = "API_ERROR";
      customErr.stack = error.stack;

      return Promise.reject(customErr);
    }

    if (error.toJSON().message === "Network Error") {
      return Promise.reject(new Error("Network Error"));
    }

    return Promise.reject(new Error(error.message));
  }
);

export default api;
