import dataService from '../services/data'
const linjatKaikki = dataService.getLinjastot()
const pysakitKaikki = dataService.getPysakit()

const haeLinjat = (reitti, mista, mihin) => {
    console.log('Haetaan linjoja...', {reitti}, {mista}, {mihin})
    if(reitti.length < 1) {
        console.log('Tyhjä', {reitti})
        return []
    }

}

export default { haeLinjat }