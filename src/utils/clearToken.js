import axios from 'axios';

export default () => {
  const token = localStorage.getItem('q_app_token');
  if(token) {
    localStorage.removeItem('q_app_token');
    delete axios.defaults.headers.common['Authorization'];
  }
}