import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Row, Col, Space, Button, Menu, Dropdown } from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import styles from './AppHeader.module.css';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

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
      <Row>
        <Col span="18">
          <Space className={styles.link} onClick={() => navigate('/')}>
            <img src="/src/assets/favicon.svg" height="50" />
            <div className={styles.titleWrapper}>
              <span className={styles.title}>SE-医疗管理系统</span>
              <span className={styles.subTitle}>
                SE-Medical Management System
              </span>
            </div>
          </Space>
        </Col>
        <Col className={styles.buttons} span="6">
          <Space>
            <Button
              shape="circle"
              size="middle"
              icon={<SearchOutlined />}
              ghost
            />
            <Dropdown overlay={menu}>
              <Button
                shape="circle"
                size="middle"
                icon={<UserOutlined />}
                ghost
              />
            </Dropdown>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
