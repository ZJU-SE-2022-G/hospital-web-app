import React from 'react';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const { Text } = Typography;

const DepartmentListPage: React.FC = () => {
  const items: MenuProps['items'] = [
    { key: 'index', label: <Text strong>科室介绍</Text> },
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
