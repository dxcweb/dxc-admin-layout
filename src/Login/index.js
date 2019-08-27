import React from "react";
import Block from "dxc-flex";
import LoginFrom from "./LoginFrom";
import is from "is_js";
import timg from "../../assets/bg.jpg";
const isMobile = is.mobile();

export default class index extends React.PureComponent {
  render() {
    const { onLogin, loading, isLogin, children, verificationCode, bgImg, loginTitle } = this.props;
    if (isLogin) {
      return children;
    }
    return (
      <DocumentTitle title={loginTitle}>
        <Block
          layout="vertical"
          style={{
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${bgImg ? bgImg : timg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="flex-child">
            <Block
              horizontal="center"
              vertical="center"
              style={{
                height: "100%",
                flex: 1,
                position: "absolute",
                right: isMobile ? 0 : "200px",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <LoginFrom loading={loading} onLogin={onLogin} verificationCode={verificationCode} />
            </Block>
          </div>
        </Block>
      </DocumentTitle>
    );
  }
}
