import { Button, Form, Input, Image } from 'antd';
import React from 'react';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
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
    <div className={styles.loginStyle}>
      <div className={styles.leftStyle}>
        <Image src="/src/assets/loginBackground.png" />
      </div>
      <div className={styles.rightStyle}>
        <div className={styles.headerStyle}>
          <Image src="/src/assets/loginIcon.png" />
          <span className={styles.textStyle}>医院网上预约系统</span>
        </div>
        <Form form={form} name="login" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="mobile"
            label="手机号"
            rules={[{ required: true, message: '请输入手机号' }]}
            style={{ width: '40%' }}
          >
            <Input addonBefore={mobileSelector} />
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
                登录
              </Button>
              <br />
              <Button type="link" shape="round" href="/register">
                还没有账号? 注册
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
