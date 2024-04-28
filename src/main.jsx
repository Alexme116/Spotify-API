import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/register/Register'
import Login from './components/login/Login'
import DashBoard from './components/dashboard/DashBoard'
import DataLink from './components/dataLink/DataLink.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/', element: <DataLink /> },
      { path: '/dashboard', element: <DashBoard /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
