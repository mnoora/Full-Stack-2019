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
            <h1> {course} </h1>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
        {parts.map( part => (
            <Part key={part.id} part={part.name} exercises={part.exercises} />
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

const Course = ({course}) => {
    return (
        <div>
            <Header course ={course.name}/>
            <Content parts = {course.parts}/>
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack -sovelluskehitys',
      parts: [
        {
          name: 'Reactin perusteet',
          exercises: 10,
          id: 1
        },
        {
          name: 'Tiedonvälitys propseilla',
          exercises: 7,
          id: 2
        },
        {
          name: 'Komponenttien tila',
          exercises: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))