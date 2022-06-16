import React from 'react';
import { Typography } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useListDoctorsQuery } from '../../apis/apiSlice';
import MenuContentLayout from '../../layouts/MenuContentLayout';

const { Text } = Typography;

const DoctorListPage: React.FC = () => {
  const { data } = useListDoctorsQuery();

  const items: MenuProps['items'] = [
    { key: 'index', label: <Text strong>医生介绍</Text> },
    {
      type: 'group',
      label: '医生列表',
      children: data
        ? data.map(({ docId, docName }) => ({
            key: docId,
            label: docName,
            icon: <UserOutlined />,
          }))
        : [{ key: 'loading', label: '加载中', disabled: true }],
    },
  ];

  return <MenuContentLayout route="/doctors" menuItems={items} />;
};

export default DoctorListPage;
