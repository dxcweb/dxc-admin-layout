import React from 'react';
import AdminLayout, { setAuthority } from '@/components/dxc-admin-layout/src';
import axios from '@/utils/axios';
import { axiosHeaders } from '@/components/dxc-admin-layout/src';
import { message } from 'antd';
import { BackTop } from 'antd';

const local_key = 'multi-coupon-admin';
export default class index extends React.PureComponent {
  state = {
    init: false,
    isLogin: false,
    loginLoading: false,
    username: '',
  };
  componentDidMount() {
    this.getCurrentUser();
  }
  getCurrentUser = () => {
    axios.post('/currentUser').then(({ result, data }) => {
      if (result) {
        // 需要设置权限
        setAuthority(data.authority);
        this.setState({
          isLogin: true,
          loginLoading: false,
          username: data.username,
          init: true,
        });
      } else {
        this.setState({
          isLogin: false,
          loginLoading: false,
          username: '',
          init: true,
        });
      }
    });
  };
  onChangePassword = (value, onFulfil) => {
    axios.post('/changePassword', value).then(({ result, data }) => {
      onFulfil(result);
    });
  };
  onLogin = data => {
    this.setState({ loginLoading: true });
    axios.post('/login', data).then(({ result, data, msg }) => {
      if (result) {
        window.localStorage.setItem(local_key, data);
        axiosHeaders.setHeaders({ Token: data });
        this.getCurrentUser();
      } else {
        this.setState({ loginLoading: false });
        message.error(msg);
      }
    });
  };
  onLogout = () => {
    axios.post('/logout');
    window.localStorage.removeItem(local_key);
    axiosHeaders.setHeaders(null);
    this.setState({ isLogin: false, username: null });
  };
  render() {
    const { isLogin, init, loginLoading, username } = this.state;
    const { route, location, children } = this.props;
    if (!init) {
      return <div />;
    }
    return (
      <AdminLayout
        onChangePassword={this.onChangePassword}
        username={username}
        location={location}
        route={route}
        isLogin={isLogin}
        loginLoading={loginLoading}
        onLogin={this.onLogin}
        onLogout={this.onLogout}
      >
        {children}
        <BackTop style={{ zIndex: 100000, right: 10 }} />
      </AdminLayout>
    );
  }
}
