import React from 'react';
import { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MenuContentView from '../../components/MenuContentView';

const DoctorListPage: React.FC = () => {
  const items: MenuProps['items'] = [
    { key: 'index', label: '医生首页' },
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

  return <MenuContentView route="/doctors" menuItems={items} />;
};

export default DoctorListPage;
