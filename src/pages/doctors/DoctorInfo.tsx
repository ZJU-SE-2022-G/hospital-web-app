import { Descriptions, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDoctorDetailQuery } from '../../apis/apiSlice';

const DoctorInfo: React.FC = () => {
  const { Title } = Typography;
  const { doctorId } = useParams();
  const { data, isFetching } = useGetDoctorDetailQuery(doctorId);
  const age = isFetching ? undefined : data[0].age;
  const department = isFetching ? undefined : data[0].departmantName;
  const docDetail = isFetching ? undefined : data[0].docDetail;
  const docName = isFetching ? undefined : data[0].docName;
  const sex = isFetching ? undefined : data[0].sex;
  return isFetching ? (
    <span>加载中...</span>
  ) : (
    <div>
      <Title level={4}>{docName}</Title>
      <Descriptions bordered>
        <Descriptions.Item label="年龄">{age}</Descriptions.Item>
        <Descriptions.Item label="性别">{sex}</Descriptions.Item>
        <Descriptions.Item label="所属科室">{department}</Descriptions.Item>
        <Descriptions.Item label="详细介绍">{docDetail}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default DoctorInfo;
