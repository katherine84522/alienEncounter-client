import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Sighting from './Sighting'
import Report from './Report'
import News from './News'

import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sighting />
    },
    {
      path: "/report",
      element: <Report />
    },
    {
      path: "/news",
      element: <News />
    }


  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
