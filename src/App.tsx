import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import store from './Redux/ReduxStore';
import Header from './components/Header';
import './App.css';
function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}
let MainApp = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};
export default MainApp;
