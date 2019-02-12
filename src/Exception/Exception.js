import React from "react";
import Button from "antd/lib/button";
import "antd/lib/button/style/index.less";
import config from "./typeConfig";
import Block from "dxc-flex";
import Link from "umi/link";

class Exception extends React.PureComponent {
  static defaultProps = {
    backText: "back to home",
    redirect: "/",
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type } = this.props;
    const pageType = type in config ? type : "404";
    return (
      <Block horizontal="center" vertical="center" style={{ minHeight: 500, height: "80%" }}>
        <Block>
          <div
            style={{
              backgroundImage: `url(${config[pageType].img})`,
              width: 350,
              height: 360,
              marginRight: 88,
              backgroundSize: "contain",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Block>
        <div>
          <div style={{ color: "#434e59", fontSize: 72, fontWeight: 700, lineHeight: "72px", marginBottom: 24 }}>
            {config[pageType].title}
          </div>
          <div style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 20, lineHeight: "20px", marginBottom: 16 }}>{config[pageType].desc}</div>
          <Link to="/">
            <Button type="primary">返回首页</Button>
          </Link>
        </div>
      </Block>
    );
  }
}

export default Exception;
