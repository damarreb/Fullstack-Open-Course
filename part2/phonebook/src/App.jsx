import React, { useEffect, useState } from 'react'
import {Persons, Filter, PersonForm} from './components'
import personService from './personService'

const App = () => {


  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameSearched, setNameSearched ] = useState('')
  
  // Effect-Hook
  const hook = () =>{
    personService.getAll()
    .then(data =>{
      setPersons(data)
    })
  }
  useEffect(hook,[])

  const addPerson = (e) => {
    e.preventDefault()

    // name repeated
    const sameName = persons.find(p => p.name === newName)
    if ( sameName == undefined){
      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson)
      .then(p => setPersons(persons.concat({...newPerson, id: p.id})))
    }
    else if (window.confirm(`${sameName.name} is already added to phonebook, replace the old number with a new one?`)){
      const replacePerson = {...sameName, number: newNumber}
      console.log(replacePerson)
      personService.replace(replacePerson)
      .then(replaced => setPersons(persons.map(p => p.id === replaced.id ? replaced : p)))
    }
  }

  const erasePerson = (person) => {
    setPersons(persons.filter(p => p.id !== person.id))
  }

  const onChangeName = (e) =>{setNewName(e.target.value)}
  const onChangeNumber = (e) =>{setNewNumber(e.target.value)}
  const onChangeSearch = (e) =>{setNameSearched(e.target.value)}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeSearch={onChangeSearch}/>

      <h3>add a new</h3>
      <PersonForm onChangeName={onChangeName}
        onChangeNumber={onChangeNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons}
        nameSearched={nameSearched}
        erasePerson={erasePerson}
      />
    </div>
  )
}

export default App