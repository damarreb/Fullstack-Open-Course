import React, { useState } from 'react'
import {Persons, Filter, PersonForm} from './components'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameSearched, setNameSearched ] = useState('')
  

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