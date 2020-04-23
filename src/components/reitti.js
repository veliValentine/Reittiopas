import dataService from '../services/data'

const stops = dataService.getPysakit()
const routes = dataService.getTiet()

const filterRoute = (from, to) => {
    //if the route is not covered by busses return true
    const routeNetwork = dataService.getLinjastot()
    
    for (const route in routeNetwork) {
        const net = routeNetwork[route]
        const indexFrom = net.findIndex(s => s === stops[from])
        const indexTo = net.findIndex(s => s === stops[to])
        //if bus network don't contain route skip to next network
        if(indexFrom === -1 || indexTo === -1) {
            continue
        }
        //Check that wanted stops are next to each other
        if(Math.abs(indexFrom-indexTo)< 2) {
            return false
        }
    }
    return true
}

const initRouteInformation = (allRoutes) => {
    console.log('init...')
    const n = stops.length
    const graph = new Array(n).fill([]) //Contains stops and next stops
    const times = Array.from({ length: n }, e => new Array(n).fill(0)) //contains times between stops

    //init graph and times
    for (let index = 0; index < routes.length; index++) {
        const route = routes[index]
        const i = stops.findIndex((p) => p === route.mista)
        const j = stops.findIndex((p) => p === route.mihin)
        if(!allRoutes && filterRoute(i, j)) {
            continue
        }
        
        let array = [...graph[i]]
        array.splice(0, 0, j)
        graph.splice(i, 1, array)
        array = [...graph[j]]
        array.splice(0, 0, i)
        graph.splice(j, 1, array)

        //Lisätään reitin kesto
        times[i][j] = route.kesto
        times[j][i] = route.kesto
    }
    console.log('...init done')
    return [graph, times]
}

const algorithm = (from, to) => {
    const [graph, times] = initRouteInformation(false) //true all possible routes. False only routes available to busses
    let time = new Array(stops.length).fill(9999999)
    let visited = new Array(stops.length).fill(0)
    let route = []

    time[from] = 0;

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
            const oldTime = time[next]
            const newTime = time[a] + times[a][next]
            queue.push(next)
            if (newTime < oldTime) {
                time[next] = newTime
                route[next] = a
            }
            //reverse distance to double check
            if (time[a] > time[next] + times[a][next]) {
                time[a] = time[next] + times[a][next]
                visited[a] = 0
                route[a] = next
                queue.push(a)
            }
        }
        if (a === to) {
            console.log('...Found faster...')
            break
        }
    }
    console.log('...Route found')
    if(time[to] === 9999999) {
        return [[], '-']
    }
    return [route, time[to]]
}

const printRoute = (route, from, to) => {
    if(route.length===0) {
        return []
    }
    console.log('print route...')
    let k = to
    let routeFromTo = []
    
    while (k !== from) {
        routeFromTo.unshift(stops[k])
        k = route[k]
    }
    routeFromTo.unshift(stops[from])
    console.log('...print route done')
    return routeFromTo
}

const getRoute = (from, to) => {
    console.log('search...')
    from = from.toUpperCase()
    to = to.toUpperCase()

    //Check that stops are in database
    if (!stops.find(s => from === s)) {
        console.log(`Can't find stop`, {from})
        return [[], '']
    } 
    if (!stops.find(s => to === s)) {
        console.log(`Can't find stop`, {to})
        return [[], '']
    }

    //find index: from & to
    from = stops.findIndex(stop => stop === from)
    to = stops.findIndex(stop => stop === to)
    if (from === to) {
        return [stops[from], 0]
    }

    const [route, time] = algorithm(from, to)
    
    //Make shortest route readable
    const routeFromTo = printRoute(route, from, to)
    
    console.log('Route', routeFromTo, 'time', time)
    console.log('...search done')
    return [routeFromTo, time]
}

export default { getRoute }