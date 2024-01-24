import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"

const getAll = () =>{
    return axios.get(baseUrl).then(response => response.data)
}

const create = (person) =>{
    return axios.post(baseUrl,person)
    .then(response => response.data)
    .catch(e => alert(`Couldn't add person ${person.name} with number ${person.number}`))
}

const erase = (person) =>{
    return axios.delete(`${baseUrl}/${person.id}`)
    .then(response => response.data)
    .catch(e => alert(`Couldn't erase person ${person.name} with number ${person.number}`))
}

const replace = (person) =>{
    return axios.put(`${baseUrl}/${person.id}`,person)
    .then(response => response.data)
    .catch(e => alert(`Couldn't change number of person ${person.name}`))
}

export default {getAll, create, erase, replace}