import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER;

export const tutorAPI = createApi({
  reducerPath: 'tutorApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/v1/tutor/` }),
  tagTypes: ['tutors'],
  endpoints: (builder) => ({
    createTutorProfile: builder.mutation({
      query: (tutor) => ({
        url: 'create',
        method: 'POST',
        body: tutor,
      }),
      invalidatesTags: ['tutors'],
    }),
    getTutorProfile: builder.query({
      query: (id) => `get-tutor/${id}`,
      providesTags: ['tutors'],
    }),
    updateTutorProfile: builder.mutation({
      query: ({ id, ...tutor }) => ({
        url: `update-tutor/${id}`,
        method: 'PUT',
        body: tutor,
      }),
      invalidatesTags: ['tutors'],
    }),
    deleteTutorProfile: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['tutors'],
    }),
  }),
});

export const { useCreateTutorProfileMutation, useGetTutorProfileQuery, useUpdateTutorProfileMutation, useDeleteTutorProfileMutation } = tutorAPI;
