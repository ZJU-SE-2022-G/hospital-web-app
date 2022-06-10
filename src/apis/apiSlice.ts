import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';

const SUCCESS = 200;

const unwrap: <T>(response: ApiResponse<T>) => T = response => {
  if (response.state !== SUCCESS) {
    throw response;
  }
  return response.data;
};

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: build => ({
    registerUser: build.mutation<void, RegisterUserRequest>({
      query: request => ({
        url: `/users/reg?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
      invalidatesTags: ['User'],
    }),

    loginUser: build.mutation<User, LoginUserRequest>({
      query: request => ({
        url: `/users/loginByPhone?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<User>) => unwrap(response),
      invalidatesTags: ['User'],
    }),

    getNotices: build.query<Page<Notice>, GetNoticesRequest>({
      query: request => `/notice/page?${stringify(request)}`,
      transformResponse: (response: ApiResponse<Page<Notice>>) =>
        unwrap(response),
    }),

    issueNotice: build.mutation<void, IssueNoticeRequest>({
      query: request => ({
        url: `/notice/create?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
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

    reserveNucleic: build.mutation<void, ReserveNucleicRequest>({
      query: request => ({
        url: `/nucTestApp/insert?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => unwrap(response),
    }),

    reserveVaccine: build.mutation<void, ReserveVaccineRequest>({
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
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetNoticesQuery,
  useIssueNoticeMutation,
  useGetEpidemicMapQuery,
  useReserveNucleicMutation,
  useReserveVaccineMutation,
} = apiSlice;
