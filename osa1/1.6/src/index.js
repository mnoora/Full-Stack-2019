import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const Statistic = (props) => {
    return (
        <div>
            <p> {props.text} {props.value} {props.text2} </p>
        </div>
    )
}
const Statistics = (props) => {
  if( props.good + props.neutral + props.bad == 0){
      return(
          <div>
              <p> Ei yhtään palautetta annettu </p>
          </div>
      )
  }
  return (
    <div>
      <Statistic text="hyvä" value={props.good} />
      <Statistic text="neutraali" value={props.neutral} />
      <Statistic text="huono" value={props.bad} />
      <Statistic text="yhteensä" value={props.good + props.neutral + props.bad} />
      <Statistic text="keskiarvo" value={(props.good*1.0 + props.neutral*0 + props.bad*-1)/(props.good + props.neutral + props.bad)} />
      <Statistic text="positiivisia" value={props.good / (props.good +props.neutral + props.bad) *100} text2 = "%" />
    </div>
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