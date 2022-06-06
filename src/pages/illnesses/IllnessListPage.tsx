import React from 'react';
import { MenuProps } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const IllnessListPage: React.FC = () => {
  const items: MenuProps['items'] = [
    { key: 'index', label: '病情首页' },
    {
      type: 'group',
      label: '病情列表',
      children: [...new Array(10).keys()].map(index => ({
        key: index,
        label: `Illness ${index}`,
        icon: <AlertOutlined />,
      })),
    },
  ];

  return <MenuContentLayout route="/illnesses" menuItems={items} />;
};

export default IllnessListPage;
