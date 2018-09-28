import axios from 'axios'
const baseUrl = '/api/decks'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById = (deckId) => {
    const request = axios.get(baseUrl + '/' + deckId)
    return request.then(response => response.data)
}

const create = (newDeck) => {
    const request = axios.post(baseUrl, newDeck)
    return request.then(response => response.data)
}



export default { getAll, getById, create }