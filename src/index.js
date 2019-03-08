import Layout from "./Layout";
import setAuthority from "./Authorized/AuthorityData";
import Exception from "./Exception/Exception";
import createAxios from "./utils/createAxios";
import axiosHeaders from "./utils/axiosHeaders";
import "antd/dist/antd.less";

export default Layout;
export { setAuthority, Exception, createAxios, axiosHeaders };
