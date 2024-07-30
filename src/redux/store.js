import { configureStore } from '@reduxjs/toolkit';
import { userAPI } from './api/userApi';
import { tutorAPI } from './api/tutorApi';
import { tuitionCenterAPI } from './api/tuitioncenterApi';
import { adminApi } from './api/adminApi';
import { reviewApi } from './api/reviewApi';
import userReducer from './reducers/userReducer';
export const server = process.env.REACT_APP_SERVER;

const store = configureStore({
  reducer: {
    [reviewApi.reducerPath]: reviewApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [tutorAPI.reducerPath]: tutorAPI.reducer,
    [tuitionCenterAPI.reducerPath]: tuitionCenterAPI.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAPI.middleware,
      adminApi.middleware,
      reviewApi.middleware,
      tutorAPI.middleware,
      tuitionCenterAPI.middleware 
    ),
});

export default store;
