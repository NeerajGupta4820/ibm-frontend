import { userExist, userNotExist } from '../reducers/userReducer'; 
import { useLoginMutation } from '../api/userApi'; 

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await useLoginMutation(user);
    dispatch(userExist(data));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const logout = () => (dispatch) => {
  dispatch(userNotExist());
};
