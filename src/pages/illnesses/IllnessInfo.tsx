import { Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetIllnessDetailQuery } from '../../apis/apiSlice';

const IllnessInfo: React.FC = () => {
  const { Title } = Typography;
  const { illnessId } = useParams();
  const { data, isFetching } = useGetIllnessDetailQuery(illnessId);
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

export default IllnessInfo;
