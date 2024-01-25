const Person = (p) =>{

return <p key={p.id}>
  {p.name} {p.number} <button onClick={(e) =>p.onClickDelete(e,p)}>delete</button>
</p>
}

const Persons = ({persons, nameSearched, onClickDelete}) => <>{persons.filter(
  p => p.name.toLowerCase().startsWith(nameSearched.toLowerCase()))
  .map(
    p => <Person key={p.id}
            name={p.name}
            number={p.number}
            id={p.id}
            onClickDelete={onClickDelete}/>
      )
}</>

const Filter = ({onChangeSearch}) => <>filter shown with <input onChange={onChangeSearch}/></>

const PersonForm = ({onChangeName, onChangeNumber, addPerson}) => <form>
<div> name: <input onChange={onChangeName}/> </div>
<div> number: <input onChange={onChangeNumber}/> </div>
<div> <button type="submit" onClick={addPerson}>add</button> </div>
</form>

const Notification = ({ type,message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export {Persons, Filter, PersonForm, Notification}