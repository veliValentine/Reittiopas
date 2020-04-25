import React, { useState } from 'react'
import reittiComponent from './components/reitti'
import linjaComponent from './components/linjat'

const Linjat = ({reitti, mista, mihin}) => {
  //console.log(('Linjat()',{reitti}, {mista}, {mihin}))
  const linjat = linjaComponent.haeLinjat(reitti, mista, mihin)
  console.log({linjat})
  //if(linjat === undefined)
  
  return(
    <div>
      <b>Linjat: </b>{linjat.map((l, index) => (
        <li key={index}>{l} </li>
      ))}
    </div>
  )
}

const App = () => {
  const [mista, setMista] = useState('p')
  const [mihin, setMihin] = useState('j')
  const [reitti, setReitti] = useState([])
  const [aika, setAika] = useState('')
  //const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)

  const handleMihinChange = (event) => {
    setMihin(event.target.value)
    setMessage(null)
  }

  const handleMistaChange = (event) => {
    setMista(event.target.value)
    setMessage(null)
  }

  const haeReitti = (event) => {
    event.preventDefault()
    console.log(`Haetaan reittiä ${mista} -> ${mihin}`)
    const [polku, aika] = reittiComponent.getRoute(mista, mihin)
    console.log({ polku }, { aika })
    setReitti(polku)
    setAika(aika)
    if (polku.length < 1) {
      setMessage('Reittiä ei löydy! Tarkistathan, että haet oikeaa pysäkkiä!!!')
    }
  }

  return (
    <div>
      <h1>Reittihaku</h1>

      <form onSubmit={haeReitti}>
        <div>
          <b>Hae reittiä: </b>{message}
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
        <Linjat reitti={reitti} mista={mista} mihin={mihin}/>
      </div>
    </div>
  )
}

export default App;
