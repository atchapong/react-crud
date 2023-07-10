import { useState , useEffect } from 'react'
import './App.css'
import Footer from './components/Footer'
import Content from './components/Content'
import Navbar from './components/Navbar'
import User from './components/User/User'
import axios from 'axios'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import UserCreate from './components/User/UserCreate'
import UserUpdate from './components/User/UserUpdate'

const router = createBrowserRouter([
  {
    path: "/",
    element: <User />,
  },
  {
    path: "/users",
    element: <User />,
  },
  {
    path: "/users/create",
    element: <UserCreate />,
  },
  {
    path: "/users/update/:id",
    element: <UserUpdate />,
  },
]);


function App() {
  return (
    <div className='App'>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  )
}

export default App
