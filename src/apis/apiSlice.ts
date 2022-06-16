import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';

const SUCCESS = 200;

const unwrap = <T>(response: ApiResponse<T>) => {
  if (response.state !== SUCCESS) {
    throw response;
  }
  return response.data;
};

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User', 'Reservation', 'Notice', 'Help', 'Feedback'],
  endpoints: build => ({
    getCurrentUser: build.query<User, void>({
      query: () => '/users/getInfo',
      transformResponse: (response: ApiResponse<User>) => response.data,
      providesTags: ['User'],
    }),

    createUser: build.mutation<void, CreateUserRequest>({
      query: request => ({
        url: `/users/reg?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
    }),

    createSession: build.mutation<User, CreateSessionRequest>({
      query: request => ({
        url: `/users/loginByPhone?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<User>) => unwrap(response),
      invalidatesTags: ['User'],
    }),

    deleteSession: build.mutation<void, void>({
      query: () => '/users/logout',
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
      invalidatesTags: ['User'],
    }),

    getUserReservation: build.query<Reservation, number>({
      query: uid => `/record/${uid}`,
      transformResponse: (response: ApiResponse<Reservation>) => response.data,
      providesTags: ['Reservation'],
    }),

    listNotices: build.query<Page<Notice>, ListNoticesRequest>({
      query: request => `/notice/page?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Page<Notice>>) => response.data,
      providesTags: (result, error, arg) => [
        { type: 'Notice', id: 'LIST' },
        ...(result?.records || []).map(({ id }) => ({
          type: 'Notice' as const,
          id,
        })),
      ],
    }),

    getNotice: build.query<Notice, GetNoticeRequest>({
      query: request => `/notice/getById?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Notice>) => response.data,
      providesTags: (result, error, arg) => [{ type: 'Notice', id: arg.id }],
    }),

    createNotice: build.mutation<Notice, CreateNoticeRequest>({
      query: request => ({
        url: '/notice/create',
        method: 'POST',
        body: request,
      }),
      transformResponse: (response: ApiResponse<Notice>) => unwrap(response),
      invalidatesTags: [{ type: 'Notice', id: 'LIST' }],
    }),

    updateNotice: build.mutation<Notice, UpdateNoticeRequest>({
      query: request => ({
        url: '/notice/update',
        method: 'POST',
        body: request,
      }),
      transformResponse: (response: ApiResponse<Notice>) => unwrap(response),
      invalidatesTags: (result, error, arg) => [{ type: 'Notice', id: arg.id }],
    }),

    deleteNotice: build.mutation<void, DeleteNoticeRequest>({
      query: request => ({
        url: `/notice/deleteById?${stringify(request)}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
      invalidatesTags: (result, error, arg) => [
        { type: 'Notice', id: 'LIST' },
        { type: 'Notice', id: arg.id },
      ],
    }),

    listHelps: build.query<Page<Help>, ListHelpsRequest>({
      query: request => `/guide/page?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Page<Help>>) => response.data,
      providesTags: [{ type: 'Help', id: 'LIST' }],
    }),

    createHelp: build.mutation<Help, CreateHelpRequest>({
      query: request => ({
        url: '/guide/create',
        method: 'POST',
        body: request,
      }),
      transformResponse: (response: ApiResponse<Help>) => unwrap(response),
      invalidatesTags: [{ type: 'Help', id: 'LIST' }],
    }),

    deleteHelp: build.mutation<void, DeleteHelpRequest>({
      query: request => ({
        url: `/guide/deleteById?${stringify(request)}`,
        method: 'DELETE',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
      invalidatesTags: [{ type: 'Help', id: 'LIST' }],
    }),

    listFeedbacks: build.query<Page<Feedback>, ListFeedbacksRequest>({
      query: request => `/problem-feedback/page?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Page<Feedback>>) =>
        response.data,
      providesTags: (result, error, arg) => [
        { type: 'Feedback', id: 'LIST' },
        ...(result?.records || []).map(({ id }) => ({
          type: 'Feedback' as const,
          id,
        })),
      ],
    }),

    getFeedback: build.query<Feedback, GetFeedbackRequest>({
      query: request => `/problem-feedback/getById?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Feedback>) => response.data,
      providesTags: (result, error, arg) => [{ type: 'Feedback', id: arg.id }],
    }),

    createFeedback: build.mutation<Feedback, CreateFeedbackRequest>({
      query: request => ({
        url: '/problem-feedback/create',
        method: 'POST',
        body: request,
      }),
      transformResponse: (response: ApiResponse<Feedback>) => unwrap(response),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),

    updateFeedback: build.mutation<Feedback, UpdateFeedbackRequest>({
      query: request => ({
        url: '/problem-feedback/answer',
        method: 'POST',
        body: request,
      }),
      transformResponse: (response: ApiResponse<Feedback>) => unwrap(response),
      invalidatesTags: (result, error, arg) => [
        { type: 'Feedback', id: arg.id },
      ],
    }),

    getEpidemicMap: build.query<any, void>({
      query: () => '/epidemic/map',
      transformResponse: (response: any) => ({
        updateTime: response.data.times,
        provinceData: response.data.list.map(({ name, econNum }: any) => ({
          name,
          value: econNum,
        })),
      }),
    }),

    createNucleicReservation: build.mutation<
      void,
      CreateNucleicReservationRequest
    >({
      query: request => ({
        url: `/nucTestApp/insert?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
    }),

    createVaccineReservation: build.mutation<
      void,
      CreateVaccineReservationRequest
    >({
      query: request => ({
        url: `/vacApp/insert?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
    }),

    listDepartments: build.query<any, void>({
      query: () => '/departmentIntro/fetch-all',
      transformResponse: (response: any) => response.data,
    }),

    getDepartment: build.query<any, string>({
      query: id => `/departmentIntro/${id}`,
      transformResponse: (response: any) => response.data,
    }),

    listDoctors: build.query<any, void>({
      query: () => '/doctorIntro/fetch-all',
      transformResponse: (response: any) => response.data,
    }),

    getDoctor: build.query<any, string>({
      query: id => `/doctorIntro/${id}`,
      transformResponse: (response: any) => response.data,
    }),

    listIllnesses: build.query<any, void>({
      query: () => '/illnessIntro/fetch-all',
      transformResponse: (response: any) => response.data,
    }),

    getIllness: build.query<any, string>({
      query: id => `/illnessIntro/${id}`,
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export { apiSlice };

export const {
  useGetCurrentUserQuery,
  useCreateUserMutation,
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetUserReservationQuery,
  useListNoticesQuery,
  useGetNoticeQuery,
  useCreateNoticeMutation,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,
  useListHelpsQuery,
  useCreateHelpMutation,
  useDeleteHelpMutation,
  useListFeedbacksQuery,
  useGetFeedbackQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useGetEpidemicMapQuery,
  useCreateNucleicReservationMutation,
  useCreateVaccineReservationMutation,
  useListDepartmentsQuery,
  useGetDepartmentQuery,
  useListDoctorsQuery,
  useGetDoctorQuery,
  useListIllnessesQuery,
  useGetIllnessQuery,
} = apiSlice;
