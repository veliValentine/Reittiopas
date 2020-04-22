import data from '../data/data.json'

const getAll = () => {
    return data
}

const getLinjastot = () => {
    return data.linjastot
}

const getPysakit = () => {
    return data.pysakit
}

const getTiet = () => {
    return data.tiet
}

export default {
    getAll, 
    getLinjastot,
    getPysakit,
    getTiet,
}