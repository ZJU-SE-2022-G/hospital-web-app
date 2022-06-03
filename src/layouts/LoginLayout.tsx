import React from 'react';
import { Typography } from 'antd';
import background from '../assets/login/background.png';
import favicon from '../assets/login/favicon.png';
import styles from './LoginLayout.module.css';

const { Title } = Typography;

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <img src={background} />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <img src={favicon} />
            <Title className={styles.text} level={4}>
              医院网上预约系统
            </Title>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;
