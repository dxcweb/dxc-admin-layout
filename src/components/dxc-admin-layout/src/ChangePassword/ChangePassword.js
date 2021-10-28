import React from 'react';
import Modal from 'antd/lib/modal';
import 'antd/lib/modal/style/index.less';

import Form from 'antd/lib/form';
import 'antd/lib/form/style/index.less';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.less';
import message from 'antd/lib/message';
import 'antd/lib/message/style/index.less';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
class ChangePassword extends React.PureComponent {
  state = { loading: false };
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('您输入的两个密码不一致！');
    } else {
      callback();
    }
  };
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && form.getFieldValue('confirm')) {
      form.validateFields(['confirm']);
    }
    callback();
  };
  onFulfil = (isSuccess) => {
    if (isSuccess) {
      message.success('修改密码成功');
      this.handleCancel();
    } else {
      this.setState({ loading: false });
    }
  };
  handleOk = () => {
    const { form, onChangePassword, onCloseChangePassword } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.setState({ loading: true });
      onChangePassword && onChangePassword(values, this.onFulfil);
    });
  };
  handleCancel = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({ loading: false });
    const { onCloseChangePassword } = this.props;
    onCloseChangePassword && onCloseChangePassword();
  };
  render() {
    const { isOpenChangePassword } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        confirmLoading={this.state.loading}
        visible={isOpenChangePassword}
        title='修改密码'
        centered
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form {...formItemLayout} onKeyDown={this.onKeyPress}>
          <Form.Item label='原密码' hasFeedback>
            {getFieldDecorator('old_password', {
              rules: [{ required: true, message: '请输入原密码' }],
            })(<Input.Password onFocus={this.onFocus} onBlur={this.onBlur} style={{ height: 40 }} placeholder='请输入原密码' />)}
          </Form.Item>
          <Form.Item label='新密码' hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入新密码' }, { validator: this.validateToNextPassword }],
            })(<Input.Password onFocus={this.onFocus} onBlur={this.onBlur} style={{ height: 40 }} placeholder='请输入新密码' />)}
          </Form.Item>
          <Form.Item label='确认密码' hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{ required: true, message: '请输入新密码' }, { validator: this.compareToFirstPassword }],
            })(<Input.Password onFocus={this.onFocus} onBlur={this.onBlur} style={{ height: 40 }} placeholder='请输入新密码' />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(ChangePassword);
