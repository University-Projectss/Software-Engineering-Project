import axios, { AxiosInstance } from "axios";

export const BASE_URL = "http://localhost:8080/";

const authorizationInterceptor = (val: AxiosInstance) => {
  val.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
    return config;
  });
};

const errorInterceptor = (val: AxiosInstance) => {
  val.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response.status === 401 || err.response.status === 403) {
        localStorage.removeItem("accessToken");
        window.location.reload();
      } else {
        return Promise.reject(err);
      }
    }
  );
};

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

authorizationInterceptor(apiClient);
errorInterceptor(apiClient);

// import axios, { AxiosInstance } from "axios";

// export const BASE_URL = "http://localhost:8080/";

// export const apiClient = axios.create({
//   baseURL: BASE_URL,
// });

// apiClient.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     config.headers.authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// apiClient.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (err) => {
//     if (err.response.status === 401 || err.response.status === 403) {
//       localStorage.removeItem("accessToken");
//       // window.location.reload();
//     } else {
//       return Promise.reject(err);
//     }
//   }
// );
