import axios from 'axios';
import * as type from './types';

// Get all quotes
export const getAllQuotes = () => async dispatch => {
  try {
    dispatch(setQuotesLoading());
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quotes`);
    dispatch({
      type: type.GET_ALL_QUOTES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: type.SET_QUOTES_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Get all quotes
export const getAllUserQuotes = (id) => async dispatch => {
  try {
    dispatch(setQuotesLoading());
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quotes/user/${id}`);
    dispatch({
      type: type.GET_USER_QUOTES,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: type.SET_QUOTES_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Get quote by id
export const getQuoteById = (id) => async dispatch => {
  try {
    dispatch(setQuotesLoading());
    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quotes/${id}`);

    dispatch({
      type: type.GET_QUOTE,
      payload: res.data
    });
  }catch(err) {
    dispatch({
      type: type.SET_QUOTES_ERROR_MESSAGE,
      payload: err.response.data.message
    })
  }
}

// Add quote
export const addQuote = (data) => async dispatch => {
  try {
    dispatch(setQuotesLoading());
    const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quotes`, data);
    dispatch({
      type: type.ADD_QUOTE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: type.SET_QUOTES_ERROR_MESSAGE,
      payload: err.response.data.message
    });
  }
}

// Edit quote 
export const editQuote = (id, data) => async dispatch => {
  try {
    dispatch(setQuotesLoading());
    const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quotes/${id}`, data);

    dispatch({
      type: type.EDIT_QUOTE,
      payload: res.data
    });
  }catch(err) {
    dispatch({
      type: type.SET_QUOTES_ERROR_MESSAGE,
      payload: err.response.data.message
    })
  }
}

// Delete quote
export const deleteQuote = (id) => async dispatch => {
  try {
    dispatch(setQuotesLoading());
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/quotes/${id}`);

    dispatch({
      type: type.DELETE_QUOTE,
      payload: res.data
    });
  }catch(err) {
    dispatch({
      type: type.SET_QUOTES_ERROR_MESSAGE,
      payload: err.response.data.message
    })
  }
}

// Set loading
export const setQuotesLoading = () => {
  return { type: type.SET_QUOTES_LOADING };
}

// Reset loading
export const resetQuotesLoading = () => {
  return { type: type.RESET_QUOTES_LOADING };
}

// Reset message
export const resetQuotesSuccessMessage = () => {
  return { type: type.RESET_QUOTES_SUCCESS_MESSAGE };
}

// Reset error
export const resetQuotesError = () => {
  return { type: type.RESET_QUOTES_ERROR_MESSAGE };
}