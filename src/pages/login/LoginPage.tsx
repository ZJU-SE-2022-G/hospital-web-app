import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import LoginLayout from '../../layouts/LoginLayout';
import { useLoginUserMutation } from '../../apis/apiSlice';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await login({
        phone: values['phone'],
        password: values['password'],
      }).unwrap();
      navigate('/');
      message.success('登录成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
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
          name="phone"
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
          <Button
            className={styles.button}
            htmlType="reset"
            type="dashed"
            shape="round"
            onClick={() => navigate(-1)}
          >
            取消
          </Button>
          <Button
            className={styles.button}
            htmlType="submit"
            type="primary"
            shape="round"
            disabled={isLoading}
          >
            登录
          </Button>
          <br />
          <Link to="/register">
            <Button className={styles.button} type="link">
              还没有账号？注册
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default LoginPage;
