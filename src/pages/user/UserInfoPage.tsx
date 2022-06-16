import React from 'react';
import { PageHeader, Spin, Descriptions, List } from 'antd';
import {
  useGetCurrentUserQuery,
  useGetUserReservationQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const UserInfoPage: React.FC = () => {
  const { data: user, isFetching: userFetching } = useGetCurrentUserQuery();
  const { data: reservation, isFetching: reservationFetching } =
    useGetUserReservationQuery();
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
      <Spin spinning={userFetching || reservationFetching}>
        <Descriptions contentStyle={{ background: '#ffffff' }} bordered>
          <Descriptions.Item label="用户 ID">{user?.uid}</Descriptions.Item>
          <Descriptions.Item label="真实姓名">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="手机号">{user?.phone}</Descriptions.Item>
          <Descriptions.Item label="身份证号">{user?.id}</Descriptions.Item>
          <Descriptions.Item label="已预约就诊信息">
            <List
              dataSource={reservation?.map((item: any) =>
                item.uid == user?.uid
                  ? `操作时间：${
                      item.orderData.substring(0, 10) +
                      ' ' +
                      item.orderData.substring(11, 16)
                    } 预约日期：
                    ${item.visitData}`
                  : '',
              )}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </PageHeader>
  );
};

export default UserInfoPage;
