import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from './AppHeader';
import styles from './AppLayout.module.css';

const { Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <AppHeader />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
