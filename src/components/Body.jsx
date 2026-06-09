import React from 'react'
import Login from './Login'
import Browse from './Browse'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/browse',
      element: <Browse /> ,
    }
  ])

const Body = () => {

  return (
    <RouterProvider router={router} >
    </RouterProvider>
  )
}

export default Body
