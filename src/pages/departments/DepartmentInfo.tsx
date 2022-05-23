import React from 'react';
import { useParams } from 'react-router-dom';

const DepartmentInfo: React.FC = () => {
  const { departmentId } = useParams();

  return <span>Content {departmentId}</span>;
};

export default DepartmentInfo;
