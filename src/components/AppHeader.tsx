import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { ProfileOutlined, SwapOutlined } from '@ant-design/icons';
import { useGetCurrentUserQuery } from '../apis/apiSlice';
import favicon from '../assets/favicon.svg';
import styles from './AppHeader.module.css';

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();

  const menu = (
    <Menu
      items={[
        {
          key: '/user',
          label: '个人信息',
          icon: <ProfileOutlined />,
        },
        { key: '/login', label: '切换用户', icon: <SwapOutlined /> },
      ]}
      onClick={e => navigate(e.key)}
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
          {user ? (
            <Dropdown overlay={menu}>
              <Button shape="round" ghost>
                您好，{user.name}
              </Button>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button shape="round">登录 / 注册</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default AppHeader;
