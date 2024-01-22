import { useState } from 'react'

const Button = ({text, onClick})=>{
  return <button onClick={onClick}>{text}</button>
}

const StatisticsLine = ({text, value}) => <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>

const Statistics = ({good,bad,neutral,all}) => {
  const statistics = <div>
    <table><tbody>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral}/>
      <StatisticsLine text="bad" value={bad}/>
      <StatisticsLine text="all" value={all}/>
      <StatisticsLine text="average" value={(good - bad) / all}/>
      <StatisticsLine text="positive" value={good/all*100 + "%"}/>
    </tbody></table>
  </div>

  if (all > 0) return <div>
      <h1>statistics</h1>
      {statistics}
    </div>
  else return <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad

  return (
    <>
    <h1>give feedback</h1>
    <Button text="good" onClick={() => setGood(good + 1)}/>
    <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
    <Button text="bad" onClick={() => setBad(bad + 1)}/>
    
    <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </>
  )
}



export default App