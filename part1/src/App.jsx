const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1,part2,part3]} exercises={[exercises1,exercises2,exercises3]}/>
      <Total sum={[exercises1,exercises2,exercises3].reduce((sum,a) => sum + a,0)}/>
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => {
  return <>
    <Part part={props.parts[0]} exercise={props.exercises[0]}/>
    <Part part={props.parts[1]} exercise={props.exercises[1]}/>
    <Part part={props.parts[2]} exercise={props.exercises[2]}/>
  </>
}

const Total = (props) => <p>Number of exercises {props.sum}</p>

const Part = (props) => <p>{props.part} {props.exercise}</p>

export default App