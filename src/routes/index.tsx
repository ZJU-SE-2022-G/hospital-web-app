import React from 'react';
import { useRoutes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/home/HomePage';
import UserListPage from '../pages/users/UserListPage';
import UserInfoPage from '../pages/users/UserInfoPage';
import DepartmentListPage from '../pages/departments/DepartmentListPage';
import DepartmentInfo from '../pages/departments/DepartmentInfo';
import DoctorListPage from '../pages/doctors/DoctorListPage';
import DoctorInfo from '../pages/doctors/DoctorInfo';
import IllnessListPage from '../pages/illnesses/IllnessListPage';
import IllnessInfo from '../pages/illnesses/IllnessInfo';
import MapInfoPage from '../pages/epidemic/MapInfoPage';
import RegisterPage from '../pages/register/RegisterPage';
import LoginPage from '../pages/login/LoginPage';

const Routes: React.FC = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'register',
          element:<RegisterPage/>
        },
        {
          path: 'login',
          element:<LoginPage/>
        },
        {
          path: 'users',
          children: [
            { index: true, element: <UserListPage /> },
            { path: ':userId', element: <UserInfoPage /> },
          ],
        },
        { path: 'manage' },
        { path: 'search' },
        { path: 'reserve' },
        {
          path: 'reserves',
          children: [{ index: true }, { path: ':reserveId' }],
        },
        { path: 'notice' },
        {
          path: 'notices',
          children: [{ index: true }, { path: ':noticeId' }],
        },
        { path: 'help', children: [{ index: true }, { path: ':helpId' }] },
        { path: 'feedback' },
        {
          path: 'feedbacks',
          children: [{ index: true }, { path: ':feedbackId' }],
        },
        {
          path: 'epidemic',
          children: [
            { index: true },
            { path: 'map', element: <MapInfoPage /> },
            { path: 'nucleic' },
            { path: 'vaccine' },
          ],
        },
        {
          path: 'departments',
          element: <DepartmentListPage />,
          children: [
            { index: true, element: <span>请选择部门</span> },
            { path: ':departmentId', element: <DepartmentInfo /> },
          ],
        },
        {
          path: 'doctors',
          element: <DoctorListPage />,
          children: [
            { index: true, element: <span>请选择医生</span> },
            { path: ':doctorId', element: <DoctorInfo /> },
          ],
        },
        {
          path: 'illnesses',
          element: <IllnessListPage />,
          children: [
            { index: true, element: <span>请选择病情</span> },
            { path: ':illnessId', element: <IllnessInfo /> },
          ],
        },
        { path: '*' },
      ],
    },
  ]);

export default Routes;
