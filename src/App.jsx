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
import { AlertDialog } from "mui-react-alert";
import { useEffect, useState } from 'react'
import { showAlertConfirmarion } from "mui-react-alert";


const Root = ({ children }) => (
  <>
    <NavBar />
    {children}
  </>
)

const App = () => {

  const [article, setArticle] = useState([])
  const [sightings, setSightings] = useState([])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root><Sighting sightings={sightings} setSightings={setSightings} /></Root>
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


  useEffect(() => {
    const request = async () => {
      let req = await fetch("http://localhost:3000/reports")
      let res = await req.json()
      setSightings(res)
      console.log(res)

    }

    const connect = async () => {
      const ws = new WebSocket("ws://localhost:3000/cable")

      ws.onopen = () => {
        console.log("Websockets connected!")

        ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{"channel": "LiveFeedChannel"}` }))
        // ws.send(JSON.stringify({ "command": "subscribe", "identifier": `{"channel": "NotificationChannel"}` }))

      }

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.type === "ping" || data.type === "welcome" || data.type === "confirm_subscription") return
        console.log('data', data)

        // Retrieve the newly created post object sent by ActionCable (Rails)
        // Update state using setPosts to reflect this change in the browser immediately
        const sighting = data.message.report
        setSightings(prevState => [sighting, ...prevState])
        showAlertConfirmarion({
          title: "A new alien sighting is posted!",
          cancelLabel: "I'm good",
          confirmLabel: "Take me there",
          subtitle:
            "Check it in the sightings",
          onConfirmation: function () {
            console.log("hi")
          }
        });
        // alert("A new alien sighting is posted!")
      }



    }



    connect()

    request()
  }, [])

  return (
    <div>
      <RouterProvider router={router} />
      <AlertDialog />
    </div>
  )
}

export default App
