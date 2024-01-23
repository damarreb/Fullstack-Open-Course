import React, { useEffect, useState } from 'react'
import {Persons, Filter, PersonForm} from './components'
import axios from 'axios'

const App = () => {


  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameSearched, setNameSearched ] = useState('')
  
  // Efect-Hook
  const hook = () =>{
    console.log("effect")
    axios
    .get("http://localhost:3001/persons").then(response =>{
      console.log("promise fulfilled")
      setPersons(response.data)
    })
  }

  useEffect(hook,[])

  const addPerson = (e) => {
    e.preventDefault()

    // name repeated
    if (persons.find(p => p.name === newName) == undefined){
      setPersons(persons.concat({name: newName, number: newNumber}))
    }
    else alert(`${newName} is already added to phonebook`)
    
    
  }

  const onChangeName = (e) =>{setNewName(e.target.value)}
  const onChangeNumber = (e) =>{setNewNumber(e.target.value)}
  const onChangeSearch = (e) =>{setNameSearched(e.target.value)}
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeSearch={onChangeSearch}/>

      <h3>add a new</h3>
      <PersonForm onChangeName={onChangeName} onChangeNumber={onChangeNumber} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons persons={persons} nameSearched={nameSearched}/>
    </div>
  )
}

export default App