import { Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDepartmentDetailQuery } from '../../apis/apiSlice';

const DepartmentInfo: React.FC = () => {
  const { Title } = Typography;
  const { departmentId } = useParams();
  const { data, isFetching } = useGetDepartmentDetailQuery(departmentId);
  const title = isFetching ? undefined : data[0].name;
  const info = isFetching ? undefined : data[0].detail;
  return isFetching ? (
    <span>加载中...</span>
  ) : (
    <div>
      <Title level={4}>{title}</Title>
      <span>{info}</span>
    </div>
  );
};

export default DepartmentInfo;
