import React from "react";
import Block from "dxc-flex";
import LoginFrom from "./LoginFrom";
import is from "is_js";
const isMobile = is.mobile();
const timg =
  "https://oss.tuobacco.com/wop2/2019-07-09/5d24078c6a916.jpg";

export default class index extends React.PureComponent {
  render() {
    const { onLogin, loading, isLogin, children } = this.props;
    if (isLogin) {
      return children;
    }
    return (
      <Block layout="vertical" style={{ height: "100vh" }}>
        <div
          style={{
            background: `url(${timg}) 100% 100% no-repeat`,
            flex: 1,
            position: "relative",
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
              <LoginFrom loading={loading} onLogin={onLogin} />
            </Block>
          </div>
        </div>
      </Block>
    );
  }
}
