import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import AppHeader from '../components/AppHeader';
import styles from './AppLayout.module.css';

const { Content } = Layout;

const AppLayout: React.FC = () => (
  <Layout className={styles.layout}>
    <AppHeader />
    <Content className={styles.content}>
      <Outlet />
    </Content>
  </Layout>
);

export default AppLayout;
