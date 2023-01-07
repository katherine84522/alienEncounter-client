import { AlertDialog, showAlertConfirmarion } from "mui-react-alert"
import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './App.css'
import NavBar from './NavBar'
import News from './News'
import NewsArticle from './NewsArticle'
import Report from './Report'
import Sighting from './Sighting'



const Root = ({ children, setSightings }) => {



  useEffect(() => {
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
          onConfirmation: () => { location.href = '/' }
        });
      }

    }

    connect()
  }, [])

  return (
    <>
      <NavBar />
      {children}
    </>
  )
}



const App = () => {

  const [article, setArticle] = useState([])
  const [sightings, setSightings] = useState([])

  useEffect(() => {
    const request = async () => {
      let req = await fetch("http://localhost:3000/reports")
      let res = await req.json()
      setSightings(res)
      console.log(res)


    }

    request()
  }, [])

  const handleSort = () => {
    // setSort(true)
    setSightings(() => {
      const sortedSightings = sightings.sort((a, b) => a.likecount > b.likecount ? -1 : 1)
      console.log('Sorted', sortedSightings.map(s => s.likecount))
      return [...sortedSightings]
    })
    console.log('is now', sightings)
  }



  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root setSightings={setSightings}><Sighting handleSort={handleSort} sightings={sightings} setSightings={setSightings} /></Root>
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
