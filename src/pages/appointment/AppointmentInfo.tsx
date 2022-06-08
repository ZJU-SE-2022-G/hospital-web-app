import React from 'react';
import { useParams } from 'react-router-dom';

const AppointmentInfo: React.FC = () => {
  const { appointmentId } = useParams();

  return <span>Content {appointmentId}</span>;
};

export default AppointmentInfo;
