import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import LoginLayout from '../../layouts/LoginLayout';
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from '../../apis/apiSlice';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [register, { isLoading: registerLoading }] = useRegisterUserMutation();
  const [login, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const isLoading = registerLoading || loginLoading;

  const onFinish = async () => {
    try {
      await register({
        id: form.getFieldValue('idcard'),
        name: form.getFieldValue('name'),
        phone: form.getFieldValue('phone'),
        password: form.getFieldValue('password'),
      }).unwrap();
      await login({
        phone: form.getFieldValue('phone'),
        password: form.getFieldValue('password'),
      }).unwrap();
      navigate('/');
      message.success('注册成功');
    } catch (err: any) {
      message.error(err.message || err.status);
    }
  };

  return (
    <LoginLayout>
      <Form
        className={styles.form}
        form={form}
        name="register"
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        validateTrigger="onBlur"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            { required: true, message: '请输入真实姓名', whitespace: true },
          ]}
        >
          <Input />
        </Form.Item>
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
          name="idcard"
          label="身份证号"
          rules={[
            { required: true, message: '请输入身份证号' },
            {
              validator: (_, value) =>
                !value || (value.length === 18 && /^\d+X?$/.test(value))
                  ? Promise.resolve()
                  : Promise.reject(new Error('请输入正确的身份证号')),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          hasFeedback
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, max: 16, message: '密码长度必须在 6 到 16 之间' },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: '请重复密码' },
            ({ getFieldValue }) => ({
              validator: (_, value) =>
                !value || getFieldValue('password') === value
                  ? Promise.resolve()
                  : Promise.reject(new Error('两次输入的密码不一致')),
            }),
          ]}
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
            注册
          </Button>
        </Form.Item>
      </Form>
    </LoginLayout>
  );
};

export default RegisterPage;
