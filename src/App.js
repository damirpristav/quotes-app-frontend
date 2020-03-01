import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import checkToken from './utils/checkToken';
import store from './store/store';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Routes from './components/Routes';

checkToken();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <div className="App">
          <Header />
          <Routes />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
