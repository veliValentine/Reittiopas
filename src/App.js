import React, { useState } from 'react'
import dataService from './services/data'
import reitti from './components/reitti'

function App() {
  const [mista, setMista] = useState('a')
  const [mihin, setMihin] = useState('b')

  const pysakit = dataService.getPysakit()
  /*  
  console.log('pysakit', pysakit)

  console.log('data', dataService.getAll())
  console.log('linjastot', dataService.getLinjastot())
  console.log('tiet', dataService.getTiet())
  console.log('-----------------------')
*/
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
      return
    }
    if(!pysakit.includes(mihin.toUpperCase())) {
      console.log(`Ei löydy pysäkkiä ${mihin}`)
      return
    }
    console.log(`Haetaan reittiä ${mista} -> ${mihin}`)
    const polku = reitti.hae(mista, mihin)
    console.log('polku', polku)
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
    </div>
  )
}

export default App;
