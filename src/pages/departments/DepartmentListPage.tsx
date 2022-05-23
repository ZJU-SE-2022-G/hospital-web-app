import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './DepartmentListPage.module.css';

const { Content, Sider } = Layout;

const DepartmentListPage: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    { key: 'index', label: '科室首页' },
    {
      type: 'group',
      label: '科室列表',
      children: [...new Array(10).keys()].map(index => ({
        key: index,
        label: `Department ${index}`,
        icon: <UserOutlined />,
      })),
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu
          items={items}
          onClick={e =>
            navigate(`/departments/${e.key === 'index' ? '' : e.key}`)
          }
        />
      </Sider>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default DepartmentListPage;
