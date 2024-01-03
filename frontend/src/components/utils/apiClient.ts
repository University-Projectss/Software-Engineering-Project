import axios, { AxiosInstance } from "axios";

export const BASE_URL = "http://localhost:8080/";

export const getAccesToken = () => {
  return localStorage.getItem("accesToken");
};

const errorInterceptor = (val: AxiosInstance) => {
  val.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        localStorage.removeItem("accesToken");
      } else {
        return Promise.reject(err);
      }
    }
  );
};

export const authorise = () => {
  return {
    headers: {
      authorization: `Bearer ${getAccesToken()}`,
    },
  };
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

errorInterceptor(apiClient);
