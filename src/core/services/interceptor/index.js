import axios from "axios";
import { getItem } from "../common/storage";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (err) => {
  // console.log(err)
  // console.log("Interceptor : " + err);

  // if (err.response.status >= 400 && err.response.status < 500) {
  //   alert("Client error: " + err.response.status);
  // }

  if (err.response.status === 401) {
    removeItem("token");
    window.location.pathname = "/auth/SignIn";
  }

  return Promise.reject(err);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token === "undefined") {
    removeItem("token");
  }
  if (token === null) {
    removeItem("token");
  }

  if (token) opt.headers.Authorization = "Bearer " + token;
  // opt.headers["Test-Header-Key"] = "This key will be sent alongside other header keys";
  return opt;
});

export default instance;
