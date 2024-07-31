import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER;
console.log(baseUrl)
export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/user` }), 
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/register', 
        method: 'POST',
        body: user,
      }),
      transformResponse: (response) => {
        // Ensure the response has the expected shape
        return response;
      },
    }),
    login: builder.mutation({
      query: (user) => ({
        url: '/login', 
        method: 'POST',
        body: user,
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ userId, adminUserId }) => ({
        url: `/delete/${userId}?adminId=${adminUserId}`,
        method: 'DELETE',
      }),
    }),
    updatePassword: builder.mutation({
      query:({userFormData})=>({
        url:`/forgot-password`,
        method:`POST`,
        body:userFormData,
      })
    })
    ,
    allUsers: builder.query({
      query: (id) => `/all?id=${id}`, 
    }),
    updateUser: builder.mutation({
      query: ({ userId, userFormData }) => ({
        url: `/update/${userId}`,
        method: 'PUT',
        body: userFormData,
      }),
    }),
  }),
});

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/user/${id}`); 
    return data;
  } catch (error) {
    throw error;
  }
};

export const { useRegisterMutation, useLoginMutation, useUpdatePasswordMutation,
  useDeleteUserMutation, useAllUsersQuery,useUpdateUserMutation  } = userAPI;
