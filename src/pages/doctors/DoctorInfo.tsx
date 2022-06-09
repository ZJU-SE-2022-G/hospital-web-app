import { Typography } from 'antd';
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
      <span>
        年龄：{age} <br />
        性别：{sex} <br />
        所属科室：{department} <br />
        {docDetail}
      </span>
    </div>
  );
};

export default DoctorInfo;
