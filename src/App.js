import React, { useState } from 'react'
import dataService from './services/data'
import reitti from './components/reitti'

function App() {
  const [mista, setMista] = useState('a')
  const [mihin, setMihin] = useState('b')
  const [route, setRoute] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

  const pysakit = dataService.getPysakit()

  const handleMihinChange = (event) => {
    setMihin(event.target.value)
  }

  const handleMistaChange = (event) => {
    setMista(event.target.value)
  }

  const haeReitti = (event) => {
    event.preventDefault()
    if (!pysakit.includes(mista.toUpperCase())) {
      console.log(`Ei löydy pysäkkiä ${mista}`)
      
      setRoute([])
      return
    }
    if (!pysakit.includes(mihin.toUpperCase())) {
      console.log(`Ei löydy pysäkkiä ${mihin}`)
      setRoute([])
      return
    }
    console.log(`Haetaan reittiä ${mista} -> ${mihin}`)
    const polku = reitti.getRoute(mista, mihin)
    console.log('polku', polku)
    setRoute(polku)
  }

  return (
    <div>
      <h1>Hi!</h1>
      <form onSubmit={haeReitti}>
        <div>
          mistä: <input value={mista} onChange={handleMistaChange} />
        </div>
        <div>
          mihin: <input value={mihin} onChange={handleMihinChange} />
        </div>
        <div>
          <button type="submit">hae reitti</button>
        </div>
      </form>
      <div>
        {route}
      </div>
    </div>
  )
}

export default App;
