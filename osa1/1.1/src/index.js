import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
    return (
        <div>
            <p> {props.part} {props.exercises} </p>
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <p> {props.course} </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.part1} exercises={props.exercises1} />
            <Part part={props.part2} exercises={props.exercises2} />
            <Part part={props.part3} exercises={props.exercises3} />
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p> yhteensä {props.exercises1 + props.exercises2 + props.exercises3} </p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = {
      name: 'Reactin perusteet',
      exercises: 10
    }
    const part2 = {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    }
    const part3 = {
      name: 'Komponenttien tila',
      exercises: 14
    }

  return (
    <div>
      <Header course={course} />
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises}  />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
