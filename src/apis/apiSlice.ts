import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const SUCCESS = 200;

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: build => ({
    registerUser: build.mutation<void, RegisterUserRequest>({
      query: ({ id, name, phone, password }) => ({
        url: `/users/reg?id=${id}&name=${name}&phone=${phone}&password=${password}`,
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
      query: ({ phone, password }) => ({
        url: `/users/loginByPhone?phone=${phone}&password=${password}`,
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

    getDepartmentInfo: build.query<any, void>({
      query: () => '/departmentIntro/fetch-all',
      transformResponse: (response: any) => response.data,
    }),

    getDepartmentDetail: build.query<any, any>({
      query: id => `/departmentIntro/${id}`,
      transformResponse: (response: any) => response.data,
    }),

    getDoctorInfo: build.query<any, void>({
      query: () => '/doctorIntro/fetch-all',
      transformResponse: (response: any) => response.data,
    }),

    getDoctorDetail: build.query<any, any>({
      query: id => `/doctorIntro/${id}`,
      transformResponse: (response: any) => response.data,
    }),

    getIllnessInfo: build.query<any, void>({
      query: () => '/illnessIntro/fetch-all',
      transformResponse: (response: any) => response.data,
    }),

    getIllnessDetail: build.query<any, any>({
      query: id => `/illnessIntro/${id}`,
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export { apiSlice };

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetEpidemicMapQuery,
  useGetDepartmentInfoQuery,
  useGetDepartmentDetailQuery,
  useGetDoctorInfoQuery,
  useGetDoctorDetailQuery,
  useGetIllnessInfoQuery,
  useGetIllnessDetailQuery,
} = apiSlice;
