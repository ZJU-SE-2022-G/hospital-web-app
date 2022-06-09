import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDepartmentDetailQuery } from '../../apis/apiSlice';

const DepartmentInfo: React.FC = () => {
  const { departmentId } = useParams();
  const { data, isFetching } = useGetDepartmentDetailQuery(departmentId);
  const info = isFetching ? undefined : data[0].detail;
  return isFetching ? <span>加载中...</span> : <span>{info}</span>;
};

export default DepartmentInfo;
