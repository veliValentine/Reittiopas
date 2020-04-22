import dataService from '../services/data'

const stops = dataService.getPysakit()
const routes = dataService.getTiet()
console.log('tiet', routes)
console.log('pysäkit', stops)

const init = () => {
    console.log('init search')
    const n = stops.length
    const graph = new Array(n).fill([]) //Contains stops and next stops
    const times = Array.from({ length: n }, e => new Array(n).fill(0)) //contains times between stops

    //init graph and times
    routes.map(route => {
        const i = stops.findIndex((p) => p.toString() === route.mista.toString())
        const j = stops.findIndex((p) => p.toString() === route.mihin.toString())

        let array = [...graph[i]]
        array.splice(0, 0, j)
        graph.splice(i, 1, array)
        array = [...graph[j]]
        array.splice(0, 0, i)
        graph.splice(j, 1, array)

        //Lisätään reitin kesto
        times[i][j] = route.kesto
        times[j][i] = route.kesto
        return true
    })

    return [graph, times]
}
const getRoute = (from, to) => {
    console.log('search')
    const [graph, times] = init()

    //Check that stops are in database
    if (!stops.find(s => from.toUpperCase() === s)) {
        console.log(`Can't find stop:${from}`)
        return []
    } 
    if (!stops.find(s => to.toUpperCase() === s)) {
        console.log(`Can't find stop:${to}`)
        return []
    }

    //find index of from & to
    from = stops.findIndex(stop => stop === from.toUpperCase())
    to = stops.findIndex(stop => stop === to.toUpperCase())
    if (from === to) {
        return [stops[from]]
    }

    //init algorithm
    let dist = new Array(stops.length).fill(9999999)
    let visited = new Array(stops.length).fill(0)
    let route = []

    dist[from] = 0;

    let queue = [].concat(from)
    console.log('Searching distances...')

    //Start with form
    //Update distance to its neighbours
    //Add neighbours to queue
    //start over untill reached destination or all stops are isited
    while (queue.length !== 0) {
        const a = queue.shift()
        if (visited[a] === 1) {
            continue
        }
        visited[a] = 1
        for (let i = 0; i < graph[a].length; i++) {
            const next = graph[a][i]
            const oldDist = dist[next]
            const newDist = dist[a] + times[a][next]
            queue.push(next)
            if (newDist < oldDist) {
                dist[next] = newDist
                route[next] = a
            }
            //reverse distance to double check
            if (dist[a] > dist[next] + times[a][next]) {
                dist[a] = dist[next] + times[a][next]
                visited[a] = 0
                route[a] = next
                queue.push(a)
            }
        }
        if (a === to) {
            console.log('Found faster...')
            break
        }
    }
    console.log('distance', dist[to])

    //Get shortest route
    let k = to
    let routeFromTo = []
    while (k !== from) {
        routeFromTo.unshift(stops[k])
        k = route[k]
    }
    routeFromTo.unshift(stops[from])
    console.log('Route', routeFromTo)
    return routeFromTo
}

export default { getRoute }