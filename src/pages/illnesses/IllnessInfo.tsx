import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetIllnessDetailQuery } from '../../apis/apiSlice';

const IllnessInfo: React.FC = () => {
  const { illnessId } = useParams();
  const { data, isFetching } = useGetIllnessDetailQuery(illnessId);
  const info = isFetching ? undefined : data[0].detail;
  return isFetching ? <span>加载中...</span> : <span>{info}</span>;
};

export default IllnessInfo;
