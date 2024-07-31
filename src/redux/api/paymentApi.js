import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_SERVER; 

export const paymentAPI = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/payments` }),
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: ({ userId, amount }) => ({
        url: `/create/${userId}`,
        method: 'POST',
        body: { amount },
      }),
    }),
    updatePaymentStatus: builder.mutation({
      query: ({ paymentIntentId, status }) => ({
        url: '/update-status',
        method: 'POST',
        body: { paymentIntentId, status },
      }),
    }),
  }),
});

export const { 
  useCreatePaymentMutation, 
  useUpdatePaymentStatusMutation 
} = paymentAPI;
