import React from 'react';
import { useRoutes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/home/HomePage';
import RegisterPage from '../pages/register/RegisterPage';
import LoginPage from '../pages/login/LoginPage';
import UserInfoPage from '../pages/user/UserInfoPage';
import AppointmentPage from '../pages/appointments/AppointmentPage';
import NoticeIssuePage from '../pages/notices/NoticeIssuePage';
import NoticeListPage from '../pages/notices/NoticeListPage';
import NoticeDetailPage from '../pages/notices/NoticeDetailPage';
import NoticeUpdatePage from '../pages/notices/NoticeUpdatePage';
import HelpPage from '../pages/help/HelpPage';
import FeedbackSendPage from '../pages/feedbacks/FeedbackSendPage';
import FeedbackListPage from '../pages/feedbacks/FeedbackListPage';
import FeedbackDetailPage from '../pages/feedbacks/FeedbackDetailPage';
import MapInfoPage from '../pages/epidemic/MapInfoPage';
import NucleicPage from '../pages/epidemic/NucleicPage';
import VaccinePage from '../pages/epidemic/VaccinePage';
import DepartmentListPage from '../pages/departments/DepartmentListPage';
import DepartmentInfo from '../pages/departments/DepartmentInfo';
import DoctorListPage from '../pages/doctors/DoctorListPage';
import DoctorInfo from '../pages/doctors/DoctorInfo';
import IllnessListPage from '../pages/illnesses/IllnessListPage';
import IllnessInfo from '../pages/illnesses/IllnessInfo';

const Routes: React.FC = () =>
  useRoutes([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'register',
          element: <RegisterPage />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'user',
          element: <UserInfoPage />,
        },
        { path: 'manage' },
        { path: 'search' },
        { path: 'reserve', element: <AppointmentPage /> },
        {
          path: 'reserves',
          children: [{ index: true }, { path: ':reserveId' }],
        },
        { path: 'notice', element: <NoticeIssuePage /> },
        {
          path: 'notices',
          children: [
            { index: true, element: <NoticeListPage /> },
            { path: ':noticeId', element: <NoticeDetailPage /> },
            {
              path: 'edit',
              children: [{ path: ':noticeId', element: <NoticeUpdatePage /> }],
            },
          ],
        },
        { path: 'help', element: <HelpPage /> },
        { path: 'feedback', element: <FeedbackSendPage /> },
        {
          path: 'feedbacks',
          children: [
            { index: true, element: <FeedbackListPage /> },
            { path: ':feedbackId', element: <FeedbackDetailPage /> },
          ],
        },
        {
          path: 'epidemic',
          children: [
            { index: true },
            { path: 'map', element: <MapInfoPage /> },
            { path: 'nucleic', element: <NucleicPage /> },
            { path: 'vaccine', element: <VaccinePage /> },
          ],
        },
        {
          path: 'departments',
          element: <DepartmentListPage />,
          children: [
            { index: true, element: <span>请选择科室</span> },
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
