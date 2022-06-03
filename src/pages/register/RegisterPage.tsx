import { Button, Form, Input, Image } from 'antd';
import React from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log('Received: ', values);
  };
  const mobileSelector = (
    <Form.Item name="prefix" noStyle>
      +86
    </Form.Item>
  );
  return (
    <div className={styles.registerStyle}>
      <div className={styles.leftStyle}>
        <Image src="/src/assets/loginBackground.png" />
      </div>
      <div className={styles.rightStyle}>
        <div className={styles.headerStyle}>
          <Image src="/src/assets/loginIcon.png" />
          <span className={styles.textStyle}>医院网上预约系统</span>
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[
              { required: true, message: '请输入真实姓名', whitespace: true },
            ]}
            style={{ width: '40%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
            style={{ width: '40%' }}
          >
            <Input addonBefore={mobileSelector} />
          </Form.Item>
          <Form.Item
            name="idcard"
            label="身份证号"
            rules={[
              { required: true, message: '请输入身份证号' },
              () => ({
                validator(_, value) {
                  if (!value || value.length == 18) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('身份证号长度不符'));
                },
              }),
            ]}
            style={{ width: '40%' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
            hasFeedback
            style={{ width: '40%' }}
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
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
            style={{ width: '40%' }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div className={styles.tailStyle}>
              <Button type="dashed" htmlType="reset" shape="round">
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                style={{ margin: 10 }}
              >
                注册
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
