import React, { useState } from 'react'
import dataService from './services/data'
import reittiComponent from './components/reitti'
import linjaComponent from './components/linjat'

function App() {
  const [mista, setMista] = useState('a')
  const [mihin, setMihin] = useState('L')
  const [reitti, setReitti] = useState([])
  const [linjat, setLinjat] = useState([])
  //const [error, setError] = useState(false)
  //const [message, setMessage] = useState(null)

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

      setReitti([])
      return
    }
    if (!pysakit.includes(mihin.toUpperCase())) {
      console.log(`Ei löydy pysäkkiä ${mihin}`)
      setReitti([])
      return
    }
    console.log(`Haetaan reittiä ${mista} -> ${mihin}`)
    const [polku, pituus] = reittiComponent.getRoute(mista, mihin)
    console.log('polku', polku, 'pituus', pituus)
    setReitti(polku)
  }

  const haeLinjat = () => {
    if(reitti.length<1) {
      return
    }
    console.log('LINJAT', linjaComponent.haeLinjat(reitti))
    setLinjat(linjaComponent.haeLinjat(reitti))
  }

  return (
    <div>
      <h1>Reittihaku</h1>

      <form onSubmit={haeReitti}>
        <div>
          <b>Hae reittiä:</b>
        </div>
        <div>
          Mistä: <input value={mista} onChange={handleMistaChange} />
        </div>
        <div>
          Minne: <input value={mihin} onChange={handleMihinChange} />
        </div>
        <div>
          <button type="submit">Hae reitti</button>
        </div>
      </form>
      <div>
        <br/>
        <b>Reitti: </b>
        {reitti}
      </div>
      <div>
        {linjat}
      </div>
    </div>
  )
}

export default App;
