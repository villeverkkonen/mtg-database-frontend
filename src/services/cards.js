import axios from 'axios'
const baseUrl = 'https://api.magicthegathering.io/v1'

const getAll = () => {
  const request = axios.get(
    baseUrl + '/cards?contains=imageUrl&pageSize=5&random=true'
  )
  return request.then(response => {
    return response.data
  })
}

const getColor = color => {
  const request = axios.get(
    baseUrl + '/cards?contains=imageUrl&pageSize=5&random=true&colors=' + color
  )
  return request.then(response => {
    return response.data
  })
}

const getById = id => {
  const request = axios.get(baseUrl + '/cards/' + id)
  return request.then(response => {
    return response.data
  })
}

const getDraftBoosters = async set => {
  const booster1 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster2 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster3 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster4 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster5 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster6 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster7 = axios.get(baseUrl + '/sets/' + set + '/booster')
  const booster8 = axios.get(baseUrl + '/sets/' + set + '/booster')
  return await Promise.all([
    booster1,
    booster2,
    booster3,
    booster4,
    booster5,
    booster6,
    booster7,
    booster8
  ]).then(boosters => {
    return boosters
  })
}

const getSets = () => {
  // throne|allegiance|guilds|2019|dominaria|rivals|amonkhet|amonkhet|devastation|
  const request = axios.get(baseUrl + '/sets?name=alpha|beta')
  return request.then(response => {
    return response.data
  })
}

export default {
  getAll,
  getColor,
  getById,
  getDraftBoosters,
  getSets
}
