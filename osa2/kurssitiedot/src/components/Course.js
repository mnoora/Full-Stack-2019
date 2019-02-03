import React from 'react'

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

export default Course