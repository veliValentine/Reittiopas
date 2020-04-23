import React, { useState } from 'react'
import reittiComponent from './components/reitti'
import linjaComponent from './components/linjat'

function App() {
  const [mista, setMista] = useState('p')
  const [mihin, setMihin] = useState('j')
  const [reitti, setReitti] = useState([])
  const [aika, setAika] = useState('')
  const [linjat, setLinjat] = useState([])
  //const [error, setError] = useState(false)
  //const [message, setMessage] = useState(null)

  const handleMihinChange = (event) => {
    setMihin(event.target.value)
  }

  const handleMistaChange = (event) => {
    setMista(event.target.value)
  }

  const haeReitti = (event) => {
    event.preventDefault()
    console.log(`Haetaan reittiä ${mista} -> ${mihin}`)
    const [polku, aika] = reittiComponent.getRoute(mista, mihin)
    console.log('polku', polku, 'aika', aika)
    setReitti(polku)
    setAika(aika)
    haeLinjat()
  }

  const haeLinjat = () => {
    console.log('--------------------------')
    setLinjat(linjaComponent.haeLinjat(reitti))
    console.log({linjat})
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
        <br />
        <b>Reitti: </b> {reitti}
      </div>
      <div>
        <b>Aika: </b> {aika}
      </div>
      <div>
        {linjat}
      </div>
    </div>
  )
}

export default App;
