import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_SERVER;

export const tuitionCenterAPI = createApi({
  reducerPath: 'tuitionCenterApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/tuition-centers/` }),
  endpoints: (builder) => ({
    createTuitionCenterProfile: builder.mutation({
      query: (tuitionCenter) => ({
        url: 'create',
        method: 'POST',
        body: tuitionCenter,
      }),
    }),
    getTuitionCenterProfile: builder.query({
      query: (id) => `get-profile/${id}`,
    }),
    updateTuitionCenterProfile: builder.mutation({
      query: ({ id, ...tuitionCenter }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: tuitionCenter,
      }),
    }),
    deleteTuitionCenterProfile: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
    }),
    getLatestTuitionCenters: builder.query({
      query: () => 'latest',
    }),
    getAllTuitionCenters: builder.query({
      query: () => 'all',
    }),
  }),
});

export const { useCreateTuitionCenterProfileMutation, useGetTuitionCenterProfileQuery,
   useUpdateTuitionCenterProfileMutation, useDeleteTuitionCenterProfileMutation,
   useGetLatestTuitionCentersQuery,
   useGetAllTuitionCentersQuery, } = tuitionCenterAPI;