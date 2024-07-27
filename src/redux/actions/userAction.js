import { userExist, userNotExist } from '../reducers/userReducer'; // Adjust path as necessary
import { useLoginMutation } from '../api/userApi'; // Adjust path as necessary

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await useLoginMutation(user); // Call the login mutation
    dispatch(userExist(data));
  } catch (error) {
    console.error('Login failed:', error);
  }
};

export const logout = () => (dispatch) => {
  // Perform any logout logic here, such as clearing tokens or sessions
  dispatch(userNotExist());
};
