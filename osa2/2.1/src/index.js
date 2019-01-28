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
            <Total parts = {course.parts}/>
        </div>
    )
}

const App = () => {
    const courses = [
      {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
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
      },
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 2,
            id: 1
          },
          {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        <Header course="Opetusohjelma"/>
        {courses.map( course => (
            <Course key={course.id} course={course} />
            ))}
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))