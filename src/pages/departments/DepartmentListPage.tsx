import React from 'react';
import { MenuProps } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';
import { useGetDepartmentInfoQuery } from '../../apis/apiSlice';

const DepartmentListPage: React.FC = () => {
  const { data, isFetching } = useGetDepartmentInfoQuery();
  const items: MenuProps['items'] = isFetching
    ? undefined
    : [
        { key: 'index', label: '科室首页' },
        {
          type: 'group',
          label: '科室列表',
          children: data.map((item: any) => ({
            key: item.id,
            label: item.name,
            icon: <UsergroupAddOutlined />,
          })),
        },
      ];

  return isFetching ? (
    <span>加载中...</span>
  ) : (
    <MenuContentLayout route="/departments" menuItems={items} />
  );
};

export default DepartmentListPage;
