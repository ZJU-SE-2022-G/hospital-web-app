import React from 'react';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import { useListIllnessesQuery } from '../../apis/apiSlice';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const { Text } = Typography;

const IllnessListPage: React.FC = () => {
  const { data } = useListIllnessesQuery();

  const items: MenuProps['items'] = [
    { key: 'index', label: <Text strong>病情介绍</Text> },
    {
      type: 'group',
      label: '病情列表',
      children: data?.map((item: any) => ({
        key: item.id,
        label: item.name,
        icon: <AlertOutlined />,
      })),
    },
  ];

  return <MenuContentLayout route="/illnesses" menuItems={items} />;
};

export default IllnessListPage;
