import React from 'react';
import Login from './Login';
import BasicLayout from './BasicLayout';

export default class index extends React.PureComponent {
  renderLogo = () => {
    const { renderLogo } = this.props;
    return renderLogo ? renderLogo() : 'logo';
  };
  render() {
    const {
      verificationCode,
      isLogin,
      loginLoading,
      onLogin,
      route,
      location,
      username,
      onLogout,
      children,
      renderDropdownMenu,
      bgImg,
      siteName = 'dxcweb',
      loginTitle = '登录',
      renderLogo,
      renderLoginFrom,
      onChangePassword,
    } = this.props;
    return (
      <Login
        renderLoginFrom={renderLoginFrom}
        loginTitle={loginTitle}
        bgImg={bgImg}
        isLogin={isLogin}
        loading={loginLoading}
        onLogin={onLogin}
        verificationCode={verificationCode}
      >
        <BasicLayout
          onChangePassword={onChangePassword}
          onLogout={onLogout}
          route={route}
          location={location}
          siteName={siteName}
          renderDropdownMenu={renderDropdownMenu}
          renderLogo={renderLogo ? renderLogo : this.renderLogo}
          username={username}
        >
          {children}
        </BasicLayout>
      </Login>
    );
  }
}
