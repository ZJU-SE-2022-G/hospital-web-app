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
    createUser: build.mutation<void, CreateUserRequest>({
      query: request => ({
        url: `/users/reg?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
      invalidatesTags: ['User'],
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
        unwrap(response),
      providesTags: [{ type: 'Notice', id: 'LIST' }],
    }),

    getNotice: build.query<Notice, GetNoticeRequest>({
      query: request => `/notice/getById?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Notice>) => unwrap(response),
    }),

    createNotice: build.mutation<void, CreateNoticeRequest>({
      query: request => ({
        url: `/notice/create?${stringify(request)}`,
        method: 'POST',
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
  }),
});

export { apiSlice };

export const {
  useCreateUserMutation,
  useCreateSessionMutation,
  useListNoticesQuery,
  useGetNoticeQuery,
  useCreateNoticeMutation,
  useGetEpidemicMapQuery,
  useCreateNucleicReservationMutation,
  useCreateVaccineReservationMutation,
} = apiSlice;
