import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () =>{
    return axios.get(baseUrl).then(response => response.data)
}

const create = (person) =>{
    return axios.post(baseUrl,person)
    .then(response => response.data)
}

const erase = (person) =>{
    return axios.delete(`${baseUrl}/${person.id}`)
    .then(response => response.data)
}

const replace = (person) =>{
    return axios.put(`${baseUrl}/${person.id}`,person)
    .then(response => response.data)
}

export default {getAll, create, erase, replace}