import React from "react";
import Login from "./Login";
import BasicLayout from "./BasicLayout";

export default class index extends React.PureComponent {
  renderLogo = () => {
    const { renderLogo } = this.props;
    return renderLogo ? renderLogo() : "logo";
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
    } = this.props;
    return (
      <Login isLogin={isLogin} loading={loginLoading} onLogin={onLogin} verificationCode={verificationCode}>
        <BasicLayout
          onLogout={onLogout}
          route={route}
          location={location}
          siteName="dxcweb"
          renderDropdownMenu={renderDropdownMenu}
          logo={this.renderLogo()}
          username={username}
        >
          {children}
        </BasicLayout>
      </Login>
    );
  }
}
