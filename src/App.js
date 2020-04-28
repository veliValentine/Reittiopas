import React, { useState } from 'react'
import reittiComponent from './components/reitti'
import linjaComponent from './components/linjat'
import dataService from './services/data'
import { Table, Alert, Button, Form, Nav, Navbar } from 'react-bootstrap'

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
        <b>Olet jo perillä!</b>
      </div>
    )
  }

  const linjat = linjaComponent.haeLinjat(reitti).concat('perillä')
  const kaikkiPysakit = dataService.getPysakit()

  let tauluntiedot = reitti.map(pysakki => (
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
  )

  return (
    <div>
      <Yhteenveto aika={aika} reitti={reitti} />
      <Table striped>
        <tbody>
          <tr>
            <th>Aika</th>
            <th>Pysäkki</th>
            <th colSpan={999}>Linjat</th>
          </tr>
          {tauluntiedot}
        </tbody>
      </Table>
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
  const pysakit = dataService.getPysakit().map(p => `${p} `)
  return (
    <Form onSubmit={haeReitti} >
      {(message &&
        <Alert variant="warning">
          {message}<br /> Pysakit: {pysakit}
        </Alert>)
      }
      <Form.Group>
        <b>Hae reittiä: </b>
      </Form.Group>
      <Form.Group>
        <b>Mistä: </b><input value={mista} onChange={handleMistaChange} />
      </Form.Group>
      <Form.Group>
        <b>Minne: </b><input value={mihin} onChange={handleMihinChange} />
      </Form.Group>
      <Button type="submit" variant="primary">Hae reitti</Button>
    </Form>
  )
}

const Header = (props) => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Brand>Reittihaku</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav.Link href="https://github.com/veliValentine/Reittiopas">
        GitHub
      </Nav.Link>
      Reitinhaku sovellus osana Solidabis Oy <a href="https://koodihaaste.solidabis.com/?utm_source=facebook&utm_medium=banner&utm_campaign=koodihaaste&fbclid=IwAR2mF2954_gj316eu1Y2dyiFKr31QwEylsvxfqLees7TZMo6_Z8EQGzR4cc">koodihaastetta</a>
      
    </Navbar.Collapse>
  </Navbar>
)

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
    <div className="container">
      <Header />
      <br />
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
