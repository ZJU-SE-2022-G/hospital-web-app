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
  message,
} from 'antd';
import { ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import {
  useGetCurrentUserQuery,
  useDeleteSessionMutation,
} from '../apis/apiSlice';
import favicon from '../assets/favicon.svg';
import styles from './AppHeader.module.css';

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUserQuery();
  const [logout] = useDeleteSessionMutation();

  const menu = (
    <Menu
      items={[
        {
          key: 'info',
          label: '个人信息',
          icon: <ProfileOutlined />,
          onClick: () => navigate('/user'),
        },
        {
          key: 'logout',
          label: '退出登录',
          icon: <LogoutOutlined />,
          onClick: async () => {
            try {
              await logout().unwrap();
              message.success('退出成功');
            } catch (err: any) {
              message.error(err.message || err.status);
            }
          },
        },
      ]}
    />
  );

  return (
    <Header className={styles.header}>
      <Row>
        <Col span={18}>
          <Link to="/">
            <Space className={styles.link}>
              <img height={50} src={favicon} />
              <div className={styles.titleWrapper}>
                <Title className={styles.title} level={4}>
                  医院网上预约系统
                </Title>
                <Text className={styles.subTitle} italic>
                  Hospital Appointment System
                </Text>
              </div>
            </Space>
          </Link>
        </Col>
        <Col className={styles.buttons} span={6}>
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
