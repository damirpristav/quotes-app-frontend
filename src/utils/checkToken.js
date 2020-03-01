import axios from 'axios';
import jwtDecode from 'jwt-decode';
import store from '../store/store';
import { setCurrentUser, resetLoading } from '../store/actions/userActions';

export default (login = false) => {
  const token = localStorage.getItem('q_app_token');
  if(token) {
    const decoded = jwtDecode(token);
    const tokenExpiration = parseInt(decoded.exp);
    const nowTimestamp = new Date().getTime() / 1000;
    const delay = (tokenExpiration - nowTimestamp) * 1000;
    if(nowTimestamp < tokenExpiration) {
      console.log(delay / 1000);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setTimeout(() => {
        localStorage.removeItem('q_app_token');
        window.location.reload();
        delete axios.defaults.headers.common['Authorization'];
      }, delay);
    }
    if(!login) {
      setTimeout(() => {
        store.dispatch(setCurrentUser(decoded));
      }, 500);
    }
  }else {
    store.dispatch(resetLoading());
  }
}