import React from 'react';
import { PageHeader, Spin, Descriptions, List, Popover, Space } from 'antd';
import {
  useGetCurrentUserQuery,
  useListAppointmentsQuery,
  useListDoctorsQuery,
} from '../../apis/apiSlice';
import { useBreadcrumbProps } from '../../utils/breadcrumb';
import styles from '../../styles/Page.module.css';

const UserInfoPage: React.FC = () => {
  const { data: user, isFetching: userFetching } = useGetCurrentUserQuery();
  const { data: appointments, isFetching: appointmentsFetching } =
    useListAppointmentsQuery();
  const { data: doctors } = useListDoctorsQuery();
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
          <Descriptions.Item label="已预约就诊信息（点击查看详情）">
            <List
              dataSource={appointments?.filter(
                appointment => appointment.uid === user?.uid,
              )}
              renderItem={item => {
                const doctor = doctors?.find(
                  doctor => doctor.docId === item.did,
                );
                const content = (
                  <div>
                    <p>科室：{doctor?.departmantName}</p>
                    <p>医生：{doctor?.docName}</p>
                    <p>预约日期：{item.visitData}</p>
                    <p>号码：{item.serialnumber}</p>
                    <p>
                      操作时间：
                      {`${item.orderData.substring(
                        0,
                        10,
                      )} ${item.orderData.substring(11, 16)}`}
                    </p>
                  </div>
                );
                return (
                  <List.Item>
                    <Popover content={content}>
                      <Space>
                        <span>科室：{doctor?.departmantName}</span>/
                        <span>预约日期：{item.visitData}</span>
                      </Space>
                    </Popover>
                  </List.Item>
                );
              }}
            />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    </PageHeader>
  );
};

export default UserInfoPage;
