import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = (props) => {
  return (
    <tr>
      <td> {props.text} </td> 
      <td> {props.value} {props.text2} </td>
    </tr>
   )
}
const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const mean = (props.good*1.0 + props.neutral*0 + props.bad*-1)/total
  const positive = props.good / total *100
  if( total === 0){
    return(
      <div>
        <p> Ei yhtään palautetta annettu </p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic text="hyvä" value={props.good} />
        <Statistic text="neutraali" value={props.neutral} />
        <Statistic text="huono" value={props.bad} />
        <Statistic text="yhteensä" value={total} />
        <Statistic text="keskiarvo" value={mean} />
        <Statistic text="positiivisia" value={positive} text2 = "%" />
      </tbody>
    </table>
    )
  }
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <h1> anna palautetta</h1>
      <Button handleClick={()=> setToGood(good + 1)} text="hyvä" />
      <Button handleClick={()=> setToNeutral(neutral + 1)} text="neutraali" />
      <Button handleClick={()=> setToBad(bad + 1)} text="huono" />
      <h1> statistiikka</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)