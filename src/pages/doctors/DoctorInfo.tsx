import React from 'react';
import { useParams } from 'react-router-dom';

const DoctorInfo: React.FC = () => {
  const { doctorId } = useParams();

  return <span>Content {doctorId}</span>;
};

export default DoctorInfo;
