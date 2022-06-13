import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Row,
  Col,
  Space,
  Typography,
  Button,
  Menu,
  Dropdown,
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import favicon from '../assets/favicon.svg';
import styles from './AppHeader.module.css';

const { Header } = Layout;
const { Title, Text } = Typography;

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
      <Row>
        <Col span="18">
          <Link to="/">
            <Space className={styles.link}>
              <img height="50" src={favicon} />
              <div className={styles.titleWrapper}>
                <Title className={styles.title} level={4}>
                  医院网上预约系统
                </Title>
                <Text className={styles.subTitle} italic>
                  Hospital Reservation System
                </Text>
              </div>
            </Space>
          </Link>
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
