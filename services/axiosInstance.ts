import axios from "axios";
import store from "@/state/store";

const axiosInstance = axios.create({
  baseURL: "https://internship.purrweb.site/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
