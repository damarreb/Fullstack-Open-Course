import React, { useEffect, useState } from 'react'
import {Persons, Filter, PersonForm, Notification} from './components'
import personService from './personService'
import './App.css'
const App = () => {


  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameSearched, setNameSearched ] = useState('')
  const [messageNotification, setMessageNotification] = useState(null)
  const [typeNotification, setTypeNotification] = useState(null)
  const [messageTimeoutId, setMessageTimeoutId] = useState(null)
  // Effect-Hooks
  const hookGetPersons = () =>{
    personService.getAll()
    .then(data =>{
      setPersons(data)
    })
  }

  //
  const setMessage = (type,message) => {
    const timeout = 5000
    clearTimeout(messageTimeoutId)
    setMessageNotification(message)
    setTypeNotification(type)
    setMessageTimeoutId(setTimeout(()=>setMessageNotification(null),timeout))
  }

  const addPerson = (e) => {
    e.preventDefault()

    // name repeated
    const sameName = persons.find(p => p.name === newName)
    if ( sameName == undefined){
      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson)
      .then(p => setPersons(persons.concat({...newPerson, id: p.id})))
      .then(()=>setMessage('success',`Added ${newName}`))
      .catch(error => setMessage('error',`Couldn't add person ${newName}: ${error.response.data.error}`))
    }
    else if (window.confirm(`${sameName.name} is already added to phonebook, replace the old number with a new one?`)){
      const replacePerson = {...sameName, number: newNumber}
      personService.replace(replacePerson)
      .then(replaced => setPersons(persons.map(p => p.id === replaced.id ? replaced : p)))
      .then(()=>setMessage('success',`Changed number of ${newName}`))
      .catch(error => setMessage('error',`Couldn't change number of ${newName}: ${error.response.data.error}`))
    }
    
  }

  const erasePerson = (person) => {
    setPersons(persons.filter(p => p.id !== person.id))
  }

  const onClickDelete = (e,p) => {
    if (window.confirm(`Delete ${p.name} ?`)){
    e.preventDefault()
    personService.erase(p)
    .then(() => erasePerson(p))
    .then(() => setMessage('success',`Information of ${p.name} has been removed from server`))
    .catch(() => setMessage('error',`Information of ${p.name} has already been removed from server`))
  }}

  const onChangeName = (e) =>{setNewName(e.target.value)}
  const onChangeNumber = (e) =>{setNewNumber(e.target.value)}
  const onChangeSearch = (e) =>{setNameSearched(e.target.value)}

  useEffect(hookGetPersons,[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={typeNotification} message={messageNotification}/>
      <Filter onChangeSearch={onChangeSearch}/>

      <h3>add a new</h3>
      <PersonForm onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons}
        nameSearched={nameSearched}
        onClickDelete={onClickDelete}
      />
    </div>
  )
}

export default App