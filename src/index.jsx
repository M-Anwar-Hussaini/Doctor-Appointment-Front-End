import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { Toaster } from 'sonner';
import './assets/css/index.css';
import store from './redux/store';
import App from './App';
import { fetchDoctors } from './redux/features/doctorsSlice';

store.dispatch(fetchDoctors());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);
