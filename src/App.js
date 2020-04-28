import React, { useState } from 'react'
import reittiComponent from './components/reitti'
import linjaComponent from './components/linjat'
import dataService from './services/data'

import {
  Table,
  Alert,
  Button,
  Form,
  Nav,
  Navbar
} from 'react-bootstrap'

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

  const linjat = linjaComponent.haeLinjat(reitti).concat('------')
  const kaikkiPysakit = dataService.getPysakit()

  //Luodaan taulukon solut omaan muuttujaan
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
  ))

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

const Lomake = ({ setReitti, setAika, setReitinAjat }) => {
  const [mista, setMista] = useState('')
  const [mihin, setMihin] = useState('')
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

    const [polku, aika, reitinAjat] = reittiComponent.getRoute(mista, mihin)
    console.log('Lomake', { polku }, { aika }, { reitinAjat })
    
    setReitti(polku)
    setAika(aika)
    setReitinAjat(reitinAjat)
    
    if (polku.length < 1) {
      setMessage('Reittiä ei löydy! Tarkistathan, että haet oikealla pysäkillä!!!')
    }
  }

  return (
    <Form onSubmit={haeReitti} >
      {(message &&
        <Alert variant="warning" onClose={() => setMessage(null)} dismissible>
          {message}
          <hr />
          Pysakit: {dataService.getPysakit().map(p => `${p} `)}
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

const Header = () => (
  <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
    <Navbar.Brand>
      Reittihaku-sovellus
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="head">
        <Nav.Link href="https://koodihaaste.solidabis.com/?utm_source=facebook&utm_medium=banner&utm_campaign=koodihaaste&fbclid=IwAR2mF2954_gj316eu1Y2dyiFKr31QwEylsvxfqLees7TZMo6_Z8EQGzR4cc">
          Reittihaku-sovellus osana Solidabis Oy koodihaastetta
        </Nav.Link>
        <Nav.Link href="https://github.com/veliValentine/Reittiopas">
          Lähdekoodi
        </Nav.Link>
        <Navbar.Text>
          by Nicolas Valentine
        </Navbar.Text>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const App = () => {
  const [reitti, setReitti] = useState([])
  const [aika, setAika] = useState('')
  const [reitinAjat, setReitinAjat] = useState([])
  
  return (
    <div className="container" fluid="true">
        <Header />
        <br />
        <h2>Reittihaku</h2>
        <Lomake
          setReitti={setReitti}
          setAika={setAika}
          setReitinAjat={setReitinAjat}
        />
        <Tiedot
          reitti={reitti}
          aika={aika}
          reitinAjat={reitinAjat}
        />
    </div>
  )
}

export default App;
