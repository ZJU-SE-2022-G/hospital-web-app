import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import styles from './MenuContentLayout.module.css';

const { Sider, Content } = Layout;

interface MenuContentLayoutProps {
  route: string;
  menuItems: MenuProps['items'];
}

const MenuContentLayout: React.FC<MenuContentLayoutProps> = ({
  route,
  menuItems,
}) => {
  const navigate = useNavigate();

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu
          items={menuItems}
          onClick={e =>
            navigate(e.key === 'index' ? route : `${route}/${e.key}`)
          }
        />
      </Sider>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MenuContentLayout;
