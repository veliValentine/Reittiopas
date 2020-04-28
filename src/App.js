import React, { useState } from 'react'
import reittiComponent from './components/reitti'
import linjaComponent from './components/linjat'
import dataService from './services/data'

const Yhteenveto = ({ aika, reitti }) => (
  <div>
    <br />
    <b>Reitti: </b>{reitti[0]}-{reitti[reitti.length - 1]}
    <b> Aika: </b>{aika}
    <br />
  </div>
)


const Tiedot = ({ reitti, aika, reitinAjat }) => {
  if (reitti.length < 1) {
    return (<></>)
  }

  if (reitti.length < 2) {
    return (
      <div>
        <br />
        Olet jo perillä!
      </div>
    )
  }

  const linjat = linjaComponent.haeLinjat(reitti).concat('Perillä')
  const kaikkiPysakit = dataService.getPysakit()

  let tauluntiedot = reitti.map(pysakki => {
    return (
      <tr key={pysakki}>
        <td>
          {reitinAjat[kaikkiPysakit.findIndex(p => p === pysakki)]}
        </td>
        <td>
          {pysakki}
        </td>
        <td>
          {linjat[reitti.findIndex(p => pysakki === p)]}
        </td>
      </tr>
    )
  })

  return (
    <div>
      <Yhteenveto aika={aika} reitti={reitti} />
      <table>
        <tbody>
          <tr>
            <th>Aika</th>
            <th>Pysäkki</th>
            <th colSpan={999}>Linjat</th>
          </tr>
          {tauluntiedot}
        </tbody>
      </table>
    </div>
  )
}

const Lomake = ({ mista, mihin, setReitti, setAika, setReitinAjat, setMessage, message, handleMistaChange, handleMihinChange }) => {
  const haeReitti = (event) => {
    event.preventDefault()
    console.log(`Haetaan reittiä ${mista} -> ${mihin}`)
    const [polku, aika, reitinAjat] = reittiComponent.getRoute(mista, mihin)
    console.log('Lomake', { polku }, { aika }, { reitinAjat })
    setReitti(polku)
    setAika(aika)
    setReitinAjat(reitinAjat)
    if (polku.length < 1) {
      setMessage('Reittiä ei löydy! Tarkistathan, että haet oikeaa pysäkkiä!!!')
    }
  }
  return (
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
  )
}

const App = () => {
  const [mista, setMista] = useState('')
  const [mihin, setMihin] = useState('')
  const [reitti, setReitti] = useState([])
  const [aika, setAika] = useState('')
  const [reitinAjat, setReitinAjat] = useState([])
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

  return (
    <div>
      <h1>Reittihaku</h1>
      <Lomake
        mista={mista}
        mihin={mihin}
        setReitti={setReitti}
        setAika={setAika}
        setReitinAjat={setReitinAjat}
        setMessage={setMessage}
        message={message}
        handleMistaChange={handleMistaChange}
        handleMihinChange={handleMihinChange}
      />
      <Tiedot reitti={reitti} aika={aika} reitinAjat={reitinAjat} />
    </div>
  )
}

export default App;
