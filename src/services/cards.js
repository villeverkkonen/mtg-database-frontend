import axios from 'axios'
const baseUrl = 'https://api.magicthegathering.io/v1/cards'

const getAll = () => {
    const request = axios.get(baseUrl + '?&pageSize=10&random=true')
    return request.then(response => { return response.data })
}

const getColor = (color) => {
    const request = axios.get(baseUrl + '?&pageSize=10&random=true&colors=' + color)
    return request.then(response => { return response.data })
}

const getById = (id) => {
    const request = axios.get(baseUrl + '/' + id)
    // return Promise.resolve(request)
    return request.then(response => { return response.data })
}

export default { getAll, getColor, getById }