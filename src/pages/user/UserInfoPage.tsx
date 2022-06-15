import React from 'react';
import { PageHeader, Spin, Descriptions } from 'antd';
import {
  useGetCurrentUserQuery,
  useGetCurrentUserReserveQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const UserInfoPage: React.FC = () => {
  const { data: user, isFetching: userFetching } = useGetCurrentUserQuery();
  const { data: reserve, isFetching: reserveFetching } =
    useGetCurrentUserReserveQuery(user?.uid, { skip: userFetching });
  const breadcrumb = useBreadcrumbProps([
    { path: '/', breadcrumbName: '首页' },
    { path: '/user', breadcrumbName: '个人信息' },
  ]);

  return (
    <PageHeader
      className={styles.largePage}
      title="个人信息"
      breadcrumb={breadcrumb}
    >
      <Spin spinning={userFetching || reserveFetching}>
        <Descriptions contentStyle={{ background: '#ffffff' }} bordered>
          <Descriptions.Item label="用户 ID">{user?.uid}</Descriptions.Item>
          <Descriptions.Item label="真实姓名">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="手机号">{user?.phone}</Descriptions.Item>
          <Descriptions.Item label="身份证号">{user?.id}</Descriptions.Item>
          <Descriptions.Item label="已预约信息">
            {reserve?.orderData}
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </PageHeader>
  );
};

export default UserInfoPage;
