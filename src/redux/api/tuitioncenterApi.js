import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER;

export const tuitionCenterAPI = createApi({
  reducerPath: 'tuitionCenterApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/v1/tuition-center/` }),
  tagTypes: ['tuitionCenters'],
  endpoints: (builder) => ({
    createTuitionCenterProfile: builder.mutation({
      query: (tuitionCenter) => ({
        url: 'create',
        method: 'POST',
        body: tuitionCenter,
      }),
      invalidatesTags: ['tuitionCenters'],
    }),
    getTuitionCenterProfile: builder.query({
      query: (id) => `get-profile/${id}`,
      providesTags: ['tuitionCenters'],
    }),
    updateTuitionCenterProfile: builder.mutation({
      query: ({ id, ...tuitionCenter }) => ({
        url: `update/${id}`,
        method: 'PUT',
        body: tuitionCenter,
      }),
      invalidatesTags: ['tuitionCenters'],
    }),
    deleteTuitionCenterProfile: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tuitionCenters'],
    }),
  }),
});

export const { useCreateTuitionCenterProfileMutation, useGetTuitionCenterProfileQuery, useUpdateTuitionCenterProfileMutation, useDeleteTuitionCenterProfileMutation } = tuitionCenterAPI;
