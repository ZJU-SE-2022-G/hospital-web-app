import React from 'react';
import { MenuProps } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const DepartmentListPage: React.FC = () => {
  const items: MenuProps['items'] = [
    { key: 'index', label: '科室首页' },
    {
      type: 'group',
      label: '科室列表',
      children: [...new Array(10).keys()].map(index => ({
        key: index,
        label: `Department ${index}`,
        icon: <UsergroupAddOutlined />,
      })),
    },
  ];

  return <MenuContentLayout route="/departments" menuItems={items} />;
};

export default DepartmentListPage;
