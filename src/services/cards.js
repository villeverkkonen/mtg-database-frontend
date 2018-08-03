import axios from 'axios'
const baseUrl = 'https://api.magicthegathering.io/v1/cards'

const getAll = () => {
    return axios.get(baseUrl)
}

const getColor = (color) => {
    return axios.get(baseUrl + '?colors=' + color)
}

const getById = (id) => {
    return axios.get(baseUrl + '/' + id)
}

export default { getAll, getColor, getById }