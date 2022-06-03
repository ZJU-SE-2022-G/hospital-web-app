import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import LoginLayout from '../../layouts/LoginLayout';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Received: ', values);
  };

  return (
    <LoginLayout>
      <Form
        className={styles.form}
        form={form}
        name="login"
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        validateTrigger="onBlur"
        onFinish={onFinish}
      >
        <Form.Item
          name="mobile"
          label="手机号"
          rules={[
            { required: true, message: '请输入手机号' },
            {
              validator: (_, value) =>
                !value || (value.length === 11 && /^\d+$/.test(value))
                  ? Promise.resolve()
                  : Promise.reject(new Error('请输入正确的手机号')),
            },
          ]}
        >
          <Input addonBefore="+86" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
          <Link to="/">
            <Button
              className={styles.button}
              type="dashed"
              htmlType="reset"
              shape="round"
            >
              取消
            </Button>
          </Link>
          <Button
            className={styles.button}
            type="primary"
            htmlType="submit"
            shape="round"
          >
            登录
          </Button>
          <br />
          <Link to="/register">
            <Button className={styles.button} type="link" shape="round">
              还没有账号？注册
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default LoginPage;
