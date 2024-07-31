import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from './api/userApi';
import { tutorAPI } from './api/tutorApi';
import { tuitionCenterAPI } from './api/tuitioncenterApi';
import { adminApi } from './api/adminApi';
import { reviewApi } from './api/reviewApi';
import { paymentAPI } from './api/paymentApi';
import userReducer from './reducers/userReducer';
import watchlistReducer from './reducers/watchlistReducer';
export const server = process.env.REACT_APP_SERVER;

const store = configureStore({
  reducer: {
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [tutorAPI.reducerPath]: tutorAPI.reducer,
    [tuitionCenterAPI.reducerPath]: tuitionCenterAPI.reducer,
    user: userReducer,
    watchlist: watchlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      adminApi.middleware,
      reviewApi.middleware,
      tutorAPI.middleware,
      tuitionCenterAPI.middleware, 
      paymentAPI.middleware
    ),
});

export default store;
