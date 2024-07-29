import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_SERVER;

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/admin/`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => {
        const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user object from localStorage
        const id = user ? user.id : null; // Extract the ID from the user object
        console.log(user); // Log the user object for debugging
        console.log(id);   // Log the ID for debugging
        return {
          url: `users?id=${id}`,
        };
      },
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `user/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllTutors: builder.query({
      query: () => 'users/Tutors',
    }),
    getAllTuitionCenters: builder.query({
      query: () => 'users/TuitionCenter',
    }),
    getAllStudents: builder.query({
      query: () => 'users/Students',
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetAllTutorsQuery,
  useGetAllTuitionCentersQuery,
  useGetAllStudentsQuery,
} = adminApi;
