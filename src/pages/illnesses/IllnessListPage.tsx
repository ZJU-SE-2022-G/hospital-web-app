import React from 'react';
import { MenuProps } from 'antd';
import { AlertOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';
import { useGetIllnessInfoQuery } from '../../apis/apiSlice';

const IllnessListPage: React.FC = () => {
  const { data, isFetching } = useGetIllnessInfoQuery();
  const items: MenuProps['items'] = isFetching
    ? undefined
    : [
        { key: 'index', label: '病情首页' },
        {
          type: 'group',
          label: '病情列表',
          children: data.map((item: any) => ({
            key: item.id,
            label: item.name,
            icon: <AlertOutlined />,
          })),
        },
      ];

  return <MenuContentLayout route="/illnesses" menuItems={items} />;
};

export default IllnessListPage;
