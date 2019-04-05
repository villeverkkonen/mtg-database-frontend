import axios from 'axios'
const baseUrl = 'https://api.magicthegathering.io/v1'

const getAll = () => {
    const request = axios.get(baseUrl + '/cards?contains=imageUrl&pageSize=5&random=true')
    return request.then(response => { return response.data })
}

const getColor = (color) => {
    const request = axios.get(baseUrl + '/cards?contains=imageUrl&pageSize=5&random=true&colors=' + color)
    return request.then(response => { return response.data })
}

const getById = (id) => {
    const request = axios.get(baseUrl + '/cards/' + id)
    return request.then(response => { return response.data })
}

const getBooster = (set) => {
    const request = axios.get(baseUrl + '/sets/' + set + '/booster')
    return request.then(response => { return response.data })
}

const getSets = () => {
    const request = axios.get(baseUrl + '/sets?name=allegiance|guilds|2019|dominaria|rivals|ixalan|amonkhet|devastation|alpha')
    return request.then(response => { return response.data })
}

export default { getAll, getColor, getById, getBooster, getSets }