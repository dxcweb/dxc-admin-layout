import axios from "axios";
import { routerRedux } from "dva/router";
import { getHeaders } from "./axiosHeaders";
function createAxios(baseURL, dispatch) {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const headers = getHeaders();
      if (headers) {
        config.headers = { ...config.headers, headers };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => {
      const { data } = response;
      if (data) {
        return data;
      } else {
        return Promise.reject(new Error("Response data error!"));
      }
    },
    (error) => {
      const { status } = error.response;
      if (status === 401) {
        dispatch({ type: "base/save", payload: { loginLoading: false } });
      } else if (status === 403) {
        dispatch(routerRedux.push("/403"));
        return {};
      } else if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push("/500"));
        return {};
      } else if (status >= 404 && status < 422) {
        dispatch(routerRedux.push("/404"));
      }
      return {};
    },
  );
  return instance;
}

export default createAxios;
