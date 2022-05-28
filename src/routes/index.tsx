import React from 'react';
import { useRoutes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/home/HomePage';
import UserListPage from '../pages/users/UserListPage';
import UserInfoPage from '../pages/users/UserInfoPage';

const Routes: React.FC = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'register' },
        { path: 'login' },
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
            { path: 'map' },
            { path: 'nucleic' },
            { path: 'vaccine' },
          ],
        },
        {
          path: 'departments',
          children: [{ index: true }, { path: ':departmentId' }],
        },
        { path: 'doctors', children: [{ index: true }, { path: ':doctorId' }] },
        {
          path: 'illnesses',
          children: [{ index: true }, { path: ':illnessId' }],
        },
        { path: '*' },
      ],
    },
  ]);

export default Routes;
