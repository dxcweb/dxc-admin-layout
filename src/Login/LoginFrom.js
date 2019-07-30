import React from "react";
import Card from "antd/lib/card";
import "antd/lib/card/style/index.less";
import Form from "antd/lib/form";
import "antd/lib/form/style/index.less";
import Input from "antd/lib/input";
import "antd/lib/input/style/index.less";
import Button from "antd/lib/button";
import "antd/lib/button/style/index.less";
import Block from "dxc-flex";

class LoginFrom extends React.PureComponent {
  handleSubmit = () => {
    const { form, onLogin } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      onLogin && onLogin(values);
    });
  };

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  };
  onBlur = () => {
    const now = +new Date();
    this.blurTimeout = setTimeout(() => {
      if (!this.focusTime || now - this.focusTime > 300) {
        window.scrollTo(0, 0);
      }
    }, 300);
  };
  onFocus = () => {
    this.focusTime = +new Date();
    clearTimeout(this.blurTimeout);
  };
  render() {
    const { verificationCode } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ width: 400 }} title="登录">
        <Form onKeyDown={this.onKeyPress}>
          <Form.Item label="账号" hasFeedback>
            {getFieldDecorator("account", {
              rules: [{ required: true, message: "请填写账号" }],
            })(
              <Input
                autoCapitalize="off"
                autoCorrect="off"
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                style={{ height: 40 }}
                placeholder="用户名长度为6~16位字符"
              />,
            )}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }],
            })(
              <Input
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                style={{ height: 40 }}
                type="password"
                placeholder="密码长度为6~16位字符"
              />,
            )}
          </Form.Item>
          {verificationCode ? (
            <Block vertical="end">
              <div style={{ flex: 1, marginRight: 20 }}>
                <Form.Item label="验证码" hasFeedback>
                  {getFieldDecorator("code", {
                    rules: [{ required: true, message: "请输入密码" }],
                  })(<Input onFocus={this.onFocus} onBlur={this.onBlur} style={{ height: 40 }} placeholder="请输入验证码" />)}
                </Form.Item>
              </div>
              <Form.Item hasFeedback>
                <div>{verificationCode}</div>
              </Form.Item>
            </Block>
          ) : null}
          <Block style={{ padding: "5px 0" }}>
            <Button size="large" type="primary" style={{ width: "100%" }} loading={this.props.loading} onClick={this.handleSubmit}>
              登录
            </Button>
          </Block>
        </Form>
      </Card>
    );
  }
}
export default Form.create()(LoginFrom);
