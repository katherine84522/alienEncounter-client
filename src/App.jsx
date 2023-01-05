import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './App.css'
import NavBar from './NavBar'
import News from './News'
import Report from './Report'
import Sighting from './Sighting'
import NewsArticle from './NewsArticle'
import { useState } from 'react'
import { AlertDialog } from "mui-react-alert";


const Root = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)

const App = () => {

  const [article, setArticle] = useState([])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root><Sighting /></Root>
    },
    {
      path: "/report",
      element: <Root><Report /></Root>
    },
    {
      path: "/news",
      element: <Root><News setArticle={setArticle} /></Root>
    },
    {
      path: "/news/:id",
      element: <Root><NewsArticle article={article} /></Root>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <AlertDialog />
    </div>
  )
}

export default App
