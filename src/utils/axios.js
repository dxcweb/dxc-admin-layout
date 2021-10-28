import { createAxios, axiosHeaders } from '@/components/dxc-admin-layout/src';

console.log(1111, axiosHeaders);
const Token = window.localStorage.getItem('multi-coupon-admin');
if (Token) {
  axiosHeaders.setHeaders({ Token });
}
const { baseURL } = process.env;
const axios = createAxios(baseURL);
export default axios;
