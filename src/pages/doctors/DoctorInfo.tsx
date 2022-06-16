import React from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Typography, Descriptions } from 'antd';
import { useGetDoctorQuery } from '../../apis/apiSlice';

const { Title } = Typography;

const DoctorInfo: React.FC = () => {
  const { doctorId = '' } = useParams();
  const { data, isFetching } = useGetDoctorQuery(doctorId);

  const age = data?.[0]?.age;
  const department = data?.[0]?.departmantName;
  const docDetail = data?.[0]?.docDetail;
  const docName = data?.[0]?.docName;
  const sex = data?.[0]?.sex;

  return (
    <Spin spinning={isFetching}>
      <Title level={4}>{docName}</Title>
      <Descriptions contentStyle={{ background: '#ffffff' }} bordered>
        <Descriptions.Item label="年龄">{age}</Descriptions.Item>
        <Descriptions.Item label="性别">{sex}</Descriptions.Item>
        <Descriptions.Item label="所属科室">{department}</Descriptions.Item>
        <Descriptions.Item label="详细介绍">{docDetail}</Descriptions.Item>
      </Descriptions>
    </Spin>
  );
};

export default DoctorInfo;
