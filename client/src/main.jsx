import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/home/index.jsx';

import MapPage from './pages/MapPage.jsx';
import LoginDrawer from './components/loginDrawer/index.jsx';
import SignupDrawer from './components/signupDrawer/index.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <LoginDrawer/>
      },
      {
        path: '/signup',
        element: <SignupDrawer/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
