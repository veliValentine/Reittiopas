import dataService from '../services/data'

const stops = dataService.getPysakit()
const tiet = dataService.getTiet()
console.log('tiet', tiet)
console.log('pysäkit', stops)

const init = () => {
    console.log('init search')
    const n = stops.length
    const naapurit = new Array(n).fill([])
    const pituus = Array.from({length: n}, e=> new Array(n).fill(0))

    tiet.map(reitti => {
        const i = stops.findIndex((p) => p.toString() === reitti.mista.toString())
        const j = stops.findIndex((p) => p.toString() === reitti.mihin.toString())
        //Lisätään polun lähtö ja määränpää toistensa naapuriksi
        let array = [...naapurit[i]]
        array.splice(0, 0, j)
        naapurit.splice(i, 1, array)
        array = [...naapurit[j]]
        array.splice(0, 0, i)
        naapurit.splice(j, 1, array)

        //Lisätään reitin kesto
        pituus[i][j] = reitti.kesto
        pituus[j][i] = reitti.kesto
        if (i === 0 && j === 0) {
            console.log(reitti.mista, reitti.mihin, reitti.kesto, pituus[i][j])
        }
        return true
    })

    return [naapurit, pituus]
}
const hae = (start, stop) => {
    console.log('search')
    const [naapurit, pituus] = init()
    start = stops.findIndex(p => p.toLowerCase() === start)
    stop = stops.findIndex(p => p.toLowerCase() === stop)
    if(start === stop) {
        return [stops[start]]
    }

    let dist = new Array(stops.length).fill(9999999)
    let visited = new Array(stops.length).fill(0)
    let from = []

    dist[start] = 0;

    let queue = [].concat(start)
    console.log('Searching distances...')

    while (queue.length !== 0) {
        const a = queue.shift()
        if(visited[a] === 1) {
            continue
        }
        visited[a] = 1
        for (let i = 0; i < naapurit[a].length; i++) {
            const next = naapurit[a][i]
            const oldDist = dist[next]
            const newDist = dist[a] + pituus[a][next]
            queue.push(next)
            if(newDist<oldDist){
                dist[next] = newDist
                from[next] = a
            }
            //reverse distance to double check
            if(dist[a] > dist[next] + pituus[a][next]){
                dist[a] = dist[next] + pituus[a][next]
                visited[a] = 0
                from[a] = next
                queue.push(a)
            }
        }
        if(a === stop) {
            console.log('Found faster...')
            break
        }
    }
    console.log('distance', dist[stop])
    //GET ROUTE
    let k = stop
    let route = []
    while (k !== start) {
        route.unshift(stops[k])
        k=from[k]
    }
    route.unshift(stops[start])
    console.log('Route', route)
    return route
}

export default { hae }