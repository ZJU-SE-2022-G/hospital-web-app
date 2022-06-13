import React from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import { useGetDepartmentQuery } from '../../apis/apiSlice';

const { Title, Paragraph } = Typography;

const DepartmentInfo: React.FC = () => {
  const { departmentId } = useParams();
  const { data, isFetching } = useGetDepartmentQuery(departmentId);

  const title = data?.[0]?.name;
  const info = data?.[0]?.detail;

  return (
    <Spin spinning={isFetching}>
      <Title level={4}>{title}</Title>
      <Paragraph>{info}</Paragraph>
    </Spin>
  );
};

export default DepartmentInfo;
