import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { stringify } from 'qs';

const SUCCESS = 200;

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: build => ({
    registerUser: build.mutation<void, RegisterUserRequest>({
      query: request => ({
        url: `/users/reg?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<void>) => {
        if (response.state !== SUCCESS) {
          throw response;
        }
      },
      invalidatesTags: ['User'],
    }),

    loginUser: build.mutation<User, LoginUserRequest>({
      query: request => ({
        url: `/users/loginByPhone?${stringify(request)}`,
        method: 'POST',
      }),
      transformResponse: (response: ApiResponse<User>) => {
        if (response.state !== SUCCESS) {
          throw response;
        }
        return response.data;
      },
      invalidatesTags: ['User'],
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
      transformResponse: (response: ApiResponse<void>) => {
        if (response.state !== SUCCESS) {
          throw response;
        }
      },
    }),
  }),
});

export { apiSlice };

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetEpidemicMapQuery,
  useReserveNucleicMutation,
} = apiSlice;
