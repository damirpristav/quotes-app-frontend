import * as type from '../actions/types';

const initialState = {
  quotes: [],
  userQuotes: [],
  quote: null,
  successMessage: null,
  error: null,
  loading: true
};

export default (state = initialState, action) => {
  switch(action.type) {
    case type.GET_ALL_QUOTES:
      return {
        ...state,
        quotes: action.payload.data,
        loading: false,
        error: null
      }
    case type.GET_USER_QUOTES:
      return {
        ...state,
        userQuotes: action.payload.data,
        loading: false,
        error: null
      }
    case type.GET_QUOTE:
      return {
        ...state,
        quote: action.payload.data,
        loading: false,
        error: null
      }
    case type.ADD_QUOTE:
      return {
        ...state,
        quotes: [action.payload.data, ...state.quotes],
        successMessage: action.payload.message,
        loading: false,
        error: null
      }
    case type.EDIT_QUOTE:
      return {
        ...state,
        quote: action.payload.data,
        successMessage: action.payload.message,
        loading: false,
        error: null
      }
    case type.DELETE_QUOTE:
      return {
        ...state,
        userQuotes: state.userQuotes.filter(quote => quote.id !== action.payload.data.id),
        loading: false,
        error: null
      }
    case type.SET_QUOTES_LOADING:
      return {
        ...state,
        loading: true
      }
    case type.RESET_QUOTES_LOADING:
      return {
        ...state,
        loading: false
      }
    case type.RESET_QUOTES_SUCCESS_MESSAGE:
      return {
        ...state,
        successMessage: null
      }
    case type.SET_QUOTES_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case type.RESET_QUOTES_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}