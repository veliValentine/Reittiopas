import dataService from '../services/data'

const pysakit = dataService.getPysakit()
const tiet = dataService.getTiet()
console.log('tiet', tiet)
console.log('pysäkit', pysakit)

const init = () => {
    const n = pysakit.length
    const naapurit = new Array(n).fill([])
    const pituus = Array.from({length: n}, e=> new Array(n).fill(0))

    tiet.map(reitti => {
        const i = pysakit.findIndex((p) => p.toString() === reitti.mista.toString())
        const j = pysakit.findIndex((p) => p.toString() === reitti.mihin.toString())
        //Lisätään polun lähtö ja määränpäälle toisensa naapuriksi
        let array = [...naapurit[i]]
        array.splice(0, 0, reitti.mihin)
        naapurit.splice(i, 1, array)
        array = [...naapurit[j]]
        array.splice(0, 0, reitti.mista)
        naapurit.splice(j, 1, array)

        //Lisätään reitin kesto
        pituus[i][j] = reitti.kesto
        pituus[j][i] = reitti.kesto
        if (i === 0 && j === 0) {
            console.log(reitti.mista, reitti.mihin, reitti.kesto, pituus[i][j])
        }
        return true
    })

    console.log(naapurit)
    console.log(pituus)
}
const hae = (start, stop) => {
    let distances = {}

    init()


    distances[start] = 0

}

export default { hae }