import React from 'react';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const { Text } = Typography;

const DoctorListPage: React.FC = () => {
  const items: MenuProps['items'] = [
    { key: 'index', label: <Text strong>医生介绍</Text> },
    {
      type: 'group',
      label: '医生列表',
      children: [...new Array(10).keys()].map(index => ({
        key: index,
        label: `Doctor ${index}`,
        icon: <UserOutlined />,
      })),
    },
  ];

  return <MenuContentLayout route="/doctors" menuItems={items} />;
};

export default DoctorListPage;
