import personService from "./personService"

const Person = (p) =>{

  const onClickDelete = (e) => {
    if (window.confirm(`Delete ${p.name} ?`)){
    e.preventDefault()
    personService.erase(p)
    .then(p.erasePerson)
  }}

return <p key={p.id}>
  {p.name} {p.number} <button onClick={onClickDelete}>delete</button>
</p>
}

const Persons = ({persons, nameSearched, erasePerson}) => <>{persons.filter(
  p => p.name.toLowerCase().startsWith(nameSearched.toLowerCase()))
  .map(
    p => <Person key={p.id}
            name={p.name}
            number={p.number}
            id={p.id}
            erasePerson={() => erasePerson(p)}/>
      )
}</>

const Filter = ({onChangeSearch}) => <>filter shown with <input onChange={onChangeSearch}/></>

const PersonForm = ({onChangeName, onChangeNumber, addPerson}) => <form>
<div> name: <input onChange={onChangeName}/> </div>
<div> number: <input onChange={onChangeNumber}/> </div>
<div> <button type="submit" onClick={addPerson}>add</button> </div>
</form>

export {Persons, Filter, PersonForm}