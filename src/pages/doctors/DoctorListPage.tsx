import React from 'react';
import { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MenuContentLayout from '../../layouts/MenuContentLayout';
import { useGetDoctorInfoQuery } from '../../apis/apiSlice';

const DoctorListPage: React.FC = () => {
  const { data, isFetching } = useGetDoctorInfoQuery();
  const items: MenuProps['items'] = isFetching
    ? undefined
    : [
        { key: 'index', label: '医生首页' },
        {
          type: 'group',
          label: '医生列表',
          children: data.map((item: any) => ({
            key: item.docId,
            label: item.docName,
            icon: <UserOutlined />,
          })),
        },
      ];

  return <MenuContentLayout route="/doctors" menuItems={items} />;
};

export default DoctorListPage;
