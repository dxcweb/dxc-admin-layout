import Block from 'dxc-flex';
import React from 'react';
import ReactDOM from 'react-dom';
import AdminLayout from '../../src';
import './index.css';
export default class Simple extends React.PureComponent {
  state = {};
  render() {
    const { isLogin, init, loginLoading, username } = this.state;
    return (
      <AdminLayout
        renderLogo={this.renderLogo}
        username={username}
        isLogin={true}
        loginLoading={loginLoading}
        onLogin={this.onLogin}
        onLogout={this.onLogout}
      >
        <div>1</div>
      </AdminLayout>
    );
  }
}

ReactDOM.render(<Simple />, document.querySelector('#demo'));
