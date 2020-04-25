import dataService from '../services/data'
const linjatKaikki = dataService.getLinjastot()
const pysakitKaikki = dataService.getPysakit()

const kasittele = (reitti, mista, mihin) => {
    console.log('käsittele reittiä...')
    const kuljetutLinjat = new Array(reitti.length - 1).fill([])
    console.log({ reitti })
    console.log({ linjatKaikki })

    for (let index = 1; index < reitti.length; index++) {
        for (const linja in linjatKaikki) {
            const pysakitLinjan = linjatKaikki[linja]
            //console.log({pysakitLinjan})
            const f = pysakitLinjan.findIndex(p => p === reitti[index - 1])
            const t = pysakitLinjan.findIndex(p => p === reitti[index])
            //console.log(reitti[index - 1], reitti[index])
            if (f === -1 || t === -1) {
                continue
            }
            if (Math.abs(f - t) < 2) {
                kuljetutLinjat[index - 1] = kuljetutLinjat[index - 1].concat(linja + ' ')
            }
        }
    }
    //console.log({ kuljetutLinjat })
    console.log('...käsitelty')
    return kuljetutLinjat
}

const haeLinjat = (reitti, mista, mihin) => {
    console.log('Haetaan linjoja...')
    console.log({ reitti }, { mista }, { mihin })
    mista = pysakitKaikki.findIndex(p => p === mista.toUpperCase().trim())
    mihin = pysakitKaikki.findIndex(p => p === mihin.toUpperCase().trim())
    if (mista === -1 || mihin === -1) {
        console.log('Linjoja ei voida hakea pysäkeille joita ei ole olemassa!!!', { mista }, { mihin })
    }

    if (reitti.length < 1) {
        console.log('Tyhjä', { reitti })
        return []
    }

    const linjat = kasittele(reitti, mista, mihin)
    console.log('...linjat haettu')
    return linjat
}

export default { haeLinjat }