const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => <h1>{props.course.name}</h1>

const Content = (props) => {
  return <>
    <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
    <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
    <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
  </>
}

const Total = (props) => <p>Number of exercises {props.parts.map(part => part.exercises).reduce((sum,a) => sum + a,0)}</p>

const Part = (props) => <p>{props.part} {props.exercise}</p>

export default App