import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

  const MostVoted = (props) => {
    const mostVotes = Math.max.apply( Math, props.votes )
    const mostVoted =  anecdotes[props.votes.indexOf(mostVotes)]
    if(mostVotes === 0){
      return (
        <p>No votes yet</p>
      )
    }
    return (
      <div>
        {mostVoted} <br/>
      has {mostVotes} votes
      </div>
    )
  }

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(6).fill(0))
  
  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  return (
    <div>
      <h1> Anecdote of the day </h1>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="next anecdote"/>
      <h1> Anecdote with most votes </h1>
      <MostVoted votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)