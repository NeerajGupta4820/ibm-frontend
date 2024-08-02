import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_SERVER;

export const tutorAPI = createApi({
  reducerPath: 'tutorApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/tutors/` }),
  endpoints: (builder) => ({
    createTutorProfile: builder.mutation({
      query: (tutor) => ({
        url: 'create',
        method: 'POST',
        body: tutor,
      }),
    }),
    getTutorProfile: builder.query({
      query: (id) => `get-tutor/${id}`,
    }),
    updateTutorProfile: builder.mutation({
      query: ({ id, ...tutor }) => ({
        url: `update-tutor/${id}`,
        method: 'PUT',
        body: tutor,
      }),
    }),
    deleteTutorProfile: builder.mutation({
      query: (id) => ({
        url: `delete/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllTutors: builder.query({
      query: () => 'all-tutors',
    }),
    getLatestTutors: builder.query({
      query: () => 'latest-tutors',
    }),
  }),
});

export const { useCreateTutorProfileMutation, useGetTutorProfileQuery, useUpdateTutorProfileMutation,
   useDeleteTutorProfileMutation,useGetAllTutorsQuery,useGetLatestTutorsQuery   } = tutorAPI;
