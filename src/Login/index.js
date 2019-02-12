import React from "react";
import Block from "dxc-flex";
import LoginFrom from "./LoginFrom";
import is from "is_js";
const isMobile = is.mobile();
const timg =
  "https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1473656207465&di=02acc31f176091e5dca7b45c1c0a52af&imgtype=jpg&src=http%3A%2F%2Fimg15.3lian.com%2F2015%2Ff1%2F134%2Fd%2F11.jpg";

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
