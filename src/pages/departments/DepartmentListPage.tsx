import React from 'react';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { useListDepartmentsQuery } from '../../apis/apiSlice';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const { Text } = Typography;

const DepartmentListPage: React.FC = () => {
  const { data } = useListDepartmentsQuery();

  const items: MenuProps['items'] = [
    { key: 'index', label: <Text strong>科室介绍</Text> },
    {
      type: 'group',
      label: '科室列表',
      children: data?.map((item: any) => ({
        key: item.id,
        label: item.name,
        icon: <UsergroupAddOutlined />,
      })),
    },
  ];

  return <MenuContentLayout route="/departments" menuItems={items} />;
};

export default DepartmentListPage;
