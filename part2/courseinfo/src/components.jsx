const Header = ({text}) => <h1>{text}</h1>

const Content = ({parts}) => {
  return <>
    {parts.map(part =>
      <Part name={part.name} exercises={part.exercises} key={part.id}/>
    )}
  </>
}

const Total = ({parts}) => <b>total of {parts.map(part => part.exercises).reduce((sum,a) => sum + a,0)} exercises</b>

const Part = ({name, exercises},key) => <p key={key}>{name} {exercises}</p>

const Course = ({course}) => {
  return <>
  <Header text={course.name}/>
  <Content parts={course.parts}/>
  <Total parts={course.parts}/>
  </>
}

export default Course