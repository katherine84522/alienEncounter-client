import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './App.css'
import NavBar from './NavBar'
import News from './News'
import Report from './Report'
import Sighting from './Sighting'

const Root = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)

const App = () => {
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
      element: <Root><News /></Root>
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
