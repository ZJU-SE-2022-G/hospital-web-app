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
  tagTypes: ['User', 'Notice'],
  endpoints: build => ({
    getCurrentUser: build.query<User, void>({
      query: () => '/users/getInfo',
      transformResponse: (response: ApiResponse<User>) => response?.data,
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

    listNotices: build.query<Page<Notice>, ListNoticesRequest>({
      query: request => `/notice/page?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Page<Notice>>) =>
        response?.data,
      providesTags: [{ type: 'Notice', id: 'LIST' }],
    }),

    getNotice: build.query<Notice, GetNoticeRequest>({
      query: request => `/notice/getById?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Notice>) => unwrap(response),
    }),

    createNotice: build.mutation<void, CreateNoticeRequest>({
      query: request => ({
        url: '/notice/create',
        method: 'POST',
        body: request,
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
      invalidatesTags: [{ type: 'Notice', id: 'LIST' }],
    }),

    getEpidemicMap: build.query<any, void>({
      query: () => '/epidemic/map',
      transformResponse: (response: any) => ({
        updateTime: response.data.times,
        provinceData: response.data.list.map(
          ({ name, econNum: value }: any) => ({
            name,
            value,
          }),
        ),
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
      transformResponse: (response: any) => unwrap(response),
    }),

    getDepartment: build.query<any, any>({
      query: id => `/departmentIntro/${id}`,
      transformResponse: (response: any) => unwrap(response),
    }),

    listDoctors: build.query<any, void>({
      query: () => '/doctorIntro/fetch-all',
      transformResponse: (response: any) => unwrap(response),
    }),

    getDoctor: build.query<any, any>({
      query: id => `/doctorIntro/${id}`,
      transformResponse: (response: any) => unwrap(response),
    }),

    listIllnesses: build.query<any, void>({
      query: () => '/illnessIntro/fetch-all',
      transformResponse: (response: any) => unwrap(response),
    }),

    getIllness: build.query<any, any>({
      query: id => `/illnessIntro/${id}`,
      transformResponse: (response: any) => unwrap(response),
    }),
  }),
});

export { apiSlice };

export const {
  useGetCurrentUserQuery,
  useCreateUserMutation,
  useCreateSessionMutation,
  useListNoticesQuery,
  useGetNoticeQuery,
  useCreateNoticeMutation,
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
