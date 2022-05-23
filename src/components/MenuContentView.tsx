import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import styles from './MenuContentView.module.css';

const { Sider, Content } = Layout;

/**
 * route 给定基路由，点击菜单时根据 menuItems 各项的 key 跳转
 */
interface MenuContentViewProps {
  route: string;
  menuItems: MenuProps['items'];
}

const MenuContentView: React.FC<MenuContentViewProps> = ({
  route,
  menuItems,
}) => {
  const navigate = useNavigate();

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu
          items={menuItems}
          onClick={e => navigate(`${route}/${e.key === 'index' ? '' : e.key}`)}
        />
      </Sider>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MenuContentView;
