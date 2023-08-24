import { useState, useEffect } from 'react'
import {
  useLocation,
  useParams,
  Link,
} from 'react-router-dom'
import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api'
export default function GamesList ({ refresh }) {
  const params = useParams()
  const location = useLocation()

  const [games, setGames] = useState([])

  useEffect(() => {
    console.log('Rendered GAMES LIST', params, location)
    if (refresh)
      axios.get(API_URL).then((response) => {
        console.log(response.data)
        setGames(response.data)
      })
  }, [refresh])

  return (
    <div>
      { games.map((game) => <Link to={`/launch?package=${game.packageName}`}><h2>{game.applicationLabel}</h2></Link>) }
    </div>
  )
}
