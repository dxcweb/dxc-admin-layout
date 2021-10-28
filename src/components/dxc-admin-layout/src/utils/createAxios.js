import axios from 'axios';
import axiosHeaders from './axiosHeaders';

import { message } from 'antd';
const { getHeaders } = axiosHeaders;
const BlobToString = (blob) => {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.onload = function(event) {
      const content = reader.result; //内容就在这里
      resolve(content);
    };
    reader.readAsText(blob);
  });
};
function createAxios(baseURL) {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use(
    (config) => {
      const headers = getHeaders();
      if (headers) {
        config.headers = { ...config.headers, ...headers };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    async (response) => {
      let { data, headers } = response;
      if (data) {
        if (typeof data === 'object' && data instanceof Blob) {
          if (data.type === 'application/json') {
            const src = await BlobToString(data);
            data = JSON.parse(src);
          } else {
            let fileName = '下载';
            const disposition = headers['content-disposition'];
            if (disposition) {
              let startIndex = disposition.indexOf('filename="');
              if (startIndex) {
                startIndex += 10;
                const endIndex = disposition.indexOf('"', startIndex);
                fileName = disposition.substr(startIndex, endIndex - startIndex);
              }
            }
            const downloadUrl = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = decodeURI(fileName);
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);
            data = { result: true };
          }
        }
        if (!data.result) {
          message.error(data.msg);
        }
        return data;
      } else {
        return Promise.reject(new Error('Response data error!'));
      }
    },
    (error) => {
      let dispatch;
      if (window.g_app && window.g_app._store) {
        dispatch = window.g_app._store.dispatch;
      }

      if (!error.response) {
        console.error(error);
        return;
      }
      const { status } = error.response;
      if (status === 401) {
        dispatch({ type: 'base/save', payload: { loginLoading: false } });
      } else {
        message.error(`请求失败，错误码：${status}`);
      }
      return {};
    },
  );
  return instance;
}

export default createAxios;
