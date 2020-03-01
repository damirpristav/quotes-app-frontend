import jwtDecode from 'jwt-decode';
import * as type from '../actions/types';
import checkToken from '../../utils/checkToken';
import clearToken from '../../utils/clearToken';

const initialState = {
  isAuthenticated: false,
  error: null,
  message: null,
  loading: true,
  user: null,
  userByUsername: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case type.LOGIN:
      const token = action.payload.data;
      localStorage.setItem('q_app_token', token);
      const decodedToken = jwtDecode(token);
      checkToken(true);
      return {
        ...state,
        isAuthenticated: true,
        user: decodedToken,
        error: null,
        message: null,
        loading: false
      }
    case type.LOGIN_FAILED:
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: false,
        error: true,
        message: action.payload.message,
        loading: false,
        user: null
      }
    case type.REGISTER:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        error: null
      }
    case type.ACTIVATE_ACCOUNT:
      return {
        ...state,
        message: action.payload.message,
        loading: false,
        error: null
      }
    case type.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        message: null,
        loading: false
      }
    case type.LOGOUT:
      clearToken();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        message: null,
        loading: false
      }
    case type.EDIT_PROFILE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: null
      }
    case type.DELETE_PROFILE:
      clearToken();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        message: action.payload.message,
        loading: false
      }
    case type.GET_USER_BY_USERNAME:
      return {
        ...state,
        userByUsername: action.payload.data,
        loading: false,
        error: null,
        message: null
      }
    case type.RESET_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
        message: null
      }
    case type.SET_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case type.SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case type.RESET_LOADING:
      return {
        ...state,
        loading: false
      }
    case type.RESET_USER_BY_USERNAME:
      return {
        ...state,
        userByUsername: null
      }
    default:
      return state;
  }
}