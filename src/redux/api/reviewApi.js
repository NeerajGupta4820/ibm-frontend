import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_SERVER;

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api/reviews`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: ({ reviewedEntityId, reviewedEntityType }) => ({
        url: "getreviews",
        params: {
          reviewedEntityId: encodeURIComponent(reviewedEntityId),
          reviewedEntityType: encodeURIComponent(reviewedEntityType),
        },
      }),
    }),
    createReview: builder.mutation({
      query: (review) => ({
        url: 'create',
        method: 'POST',
        body: review,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `reviews/${id}`,
        method: 'DELETE',
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, ...review }) => ({
        url: `reviews/${id}`,
        method: 'PUT',
        body: review,
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = reviewApi;
