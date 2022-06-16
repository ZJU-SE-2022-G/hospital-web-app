import React from 'react';
import { PageHeader, Spin, Descriptions, List, Space } from 'antd';
import {
  useGetCurrentUserQuery,
  useListAppointmentsQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const UserInfoPage: React.FC = () => {
  const { data: user, isFetching: userFetching } = useGetCurrentUserQuery();
  const { data: appointments, isFetching: appointmentsFetching } =
    useListAppointmentsQuery();
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
      <Spin spinning={userFetching || appointmentsFetching}>
        <Descriptions contentStyle={{ background: '#ffffff' }} bordered>
          <Descriptions.Item label="用户 ID">{user?.uid}</Descriptions.Item>
          <Descriptions.Item label="姓名">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="手机号">{user?.phone}</Descriptions.Item>
          <Descriptions.Item label="身份证号">{user?.id}</Descriptions.Item>
          <Descriptions.Item label="已预约就诊信息">
            <List
              dataSource={appointments
                ?.filter(appointment => appointment.uid === user?.uid)
                .map(appointment => (
                  <Space>
                    <span>
                      操作时间：
                      {appointment.orderData.substring(0, 10) +
                        ' ' +
                        appointment.orderData.substring(11, 16)}
                    </span>
                    /<span>预约日期：{appointment.visitData}</span>
                  </Space>
                ))}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </PageHeader>
  );
};

export default UserInfoPage;
