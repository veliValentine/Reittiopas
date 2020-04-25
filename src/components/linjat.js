import dataService from '../services/data'
const linjatKaikki = dataService.getLinjastot()

const kasittele = (reitti) => {
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

            //Tarkistetaan, että reittiväliä voi kulkea kyseisellä linjalla
            if (f === -1 || t === -1) {
                continue
            }
            //Tarkistetaan, että linjan pysäkit ovat vierekkäin
            if (Math.abs(f - t) < 2) {
                kuljetutLinjat[index - 1] = kuljetutLinjat[index - 1].concat(linja + ' ')
            }
        }
    }
    //console.log({ kuljetutLinjat })
    console.log('...käsitelty')
    return kuljetutLinjat
}

const haeLinjat = (reitti) => {
    console.log('Haetaan linjoja...')
    console.log({ reitti })
    
    //Tarkistetaan, että reittiä pitkin voi kulkea
    if (reitti.length < 1) {
        console.log('Tyhjä', { reitti })
        return []
    }

    //Haetaan käytettäviä linjoja
    const linjat = kasittele(reitti)
    
    console.log('...linjat haettu')
    return linjat
}

export default { haeLinjat }