import axios from 'axios';
import { message } from 'antd';
const { baseURL } = process.env;

const instance = axios.create({
  baseURL,
});
// instance.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );
instance.interceptors.response.use(
  response => {
    const { data } = response;
    if (data) {
      return data;
    } else {
      return Promise.reject(new Error('Response data error!'));
    }
  },
  error => {
    const dispatch = window.g_app._store.dispatch;
    const { status } = error.response;
    if (status === 401) {
      dispatch({ type: 'base/save', payload: { loginLoading: false } });
    } else {
      message.error('抱歉，服务器出错了');
    }
    return {};
  }
);
export default instance;
