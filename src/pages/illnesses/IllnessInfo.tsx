import React from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import { useGetIllnessQuery } from '../../apis/apiSlice';

const { Title, Paragraph } = Typography;

const IllnessInfo: React.FC = () => {
  const { illnessId } = useParams();
  const { data, isFetching } = useGetIllnessQuery(illnessId);

  const title = data?.[0]?.name;
  const info = data?.[0]?.detail;

  return (
    <Spin spinning={isFetching}>
      <Title level={4}>{title}</Title>
      <Paragraph>{info}</Paragraph>
    </Spin>
  );
};

export default IllnessInfo;
