import axios from 'axios';
import * as type from './types';

// Login
export const login = (data) => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`, data);

    dispatch({
      type: type.LOGIN,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.LOGIN_FAILED,
      payload: err.response.data
    })
  }
}

// Register
export const register = (data) => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/register`, data);

    dispatch({
      type: type.REGISTER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.SET_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Activate account 
export const activateAccount = (token) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/activateAccount/${token}`);

    dispatch({
      type: type.ACTIVATE_ACCOUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.SET_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Set current user to decoded token if logged in
export const setCurrentUser = (data) => {
  return { type: type.SET_CURRENT_USER, payload: data };
}

// Logout
export const logout = () => dispatch => {
  dispatch(setLoading());
  setTimeout(() => {
    dispatch({ type: type.LOGOUT });
  }, 500);
}

// Set Loading
export const setLoading = () => {
  return { type: type.SET_LOADING };
}

// Reset Loading
export const resetLoading = () => {
  return { type: type.RESET_LOADING };
}

// Reset error message
export const resetErrorMessage = () => {
  return { type: type.RESET_ERROR_MESSAGE };
}

// Edit Profile
export const editProfile = (id, data) => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${id}`, data);

    dispatch({
      type: type.EDIT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.SET_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Delete Profile
export const deleteProfile = (id) => async dispatch => {
  try {
    dispatch(setLoading());
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${id}`);

    dispatch({
      type: type.DELETE_PROFILE,
      payload: res.data
    });
    dispatch(logout);
  } catch (err) {
    dispatch({
      type: type.SET_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Get user by username
export const getUserByUsername = (username) => async dispatch => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${username}`);

    dispatch({
      type: type.GET_USER_BY_USERNAME,
      payload: res.data
    }) 
  } catch (err) {
    dispatch({
      type: type.SET_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Reset user by username
export const resetUserByUsername = () => {
  return { type: type.RESET_USER_BY_USERNAME };
}