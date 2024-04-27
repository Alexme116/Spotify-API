import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/login/Login'
import DashBoard from './components/dashboard/DashBoard'

const router = createBrowserRouter([
  {
    path: '/vite-react-router/',
    element: <App />,
    children: [
      { path: '/vite-react-router/', element: <Register /> },
      { path: '/vite-react-router/login', element: <Login /> },
      { path: '/vite-react-router/dashboard', element: <DashBoard /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
