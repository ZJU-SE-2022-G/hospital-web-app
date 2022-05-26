import React from 'react';
import { useParams } from 'react-router-dom';

const IllnessInfo: React.FC = () => {
  const { illnessId } = useParams();

  return <span>Content {illnessId}</span>;
};

export default IllnessInfo;
