import React from 'react'
import ReactDOM from 'react-dom'

const Part = ({part, exercises}) => {
    return (
        <div>
            <p> {part} {exercises} </p>
        </div>
    )
}

const Header = ({course }) => {
    return (
        <div>
            <p> {course} </p>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map( part => (
            <Part key={part.name} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}

const Total = ({parts}) => {
    return (
        <div>
            <p> yhteensä {parts.map( part =>
                part.exercises).reduce((firstValue, secondValue) => firstValue + secondValue)}  </p>
        </div>
    )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}  />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
