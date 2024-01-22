const Person = ({name,number},key) => <p key={key}>{name} {number}</p>

const Persons = ({persons, nameSearched}) => <>{persons.filter(
  p => p.name.toLowerCase().startsWith(nameSearched.toLowerCase()))
  .map(
    p => <Person name={p.name} number={p.number} key={p.name}/>)
}</>

const Filter = ({onChangeSearch}) => <>filter shown with <input onChange={onChangeSearch}/></>

const PersonForm = ({onChangeName, onChangeNumber, addPerson}) => <form>
<div> name: <input onChange={onChangeName}/> </div>
<div> number: <input onChange={onChangeNumber}/> </div>
<div> <button type="submit" onClick={addPerson}>add</button> </div>
</form>

export {Persons, Filter, PersonForm}