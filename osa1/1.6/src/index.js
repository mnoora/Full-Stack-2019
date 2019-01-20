import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
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
      <p>hyvä {good} </p>
      <p> neutraali {neutral} </p>
      <p> huono {bad} </p>
      <p> yhteensä {good + neutral + bad} </p>
      <p> keskiarvo {(good*1.0 + neutral*0 + bad*-1)/(good + neutral + bad)}</p>
      <p> positiivisia {good / (good +neutral + bad) *100} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)