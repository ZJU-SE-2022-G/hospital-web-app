import React from 'react';
import { Layout, Space, Button, Menu, Dropdown } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './AppHeader.module.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const menu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: <span>退出登录</span>,
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <Header className={styles.header}>
      <Space>
        <img src="/src/assets/favicon.svg" height="50" />
        <div className={styles.titleWrapper}>
          <span className={styles.title}>医院网上预约系统</span>
          <span className={styles.subTitle}>Hospital Reservation System</span>
        </div>
      </Space>
      <Space>
        <Button shape="circle" size="middle" icon={<SearchOutlined />} ghost />
        <Dropdown overlay={menu}>
          <Button shape="circle" size="middle" icon={<UserOutlined />} ghost />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;
