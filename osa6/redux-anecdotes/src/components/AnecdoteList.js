import React from 'react';
import { connect } from 'react-redux'
import { 
    vote
  } 
from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
  
    const addVote = (id) => {
      props.vote(id)
      const anec = anecdotes.find(n => n.id === id)
      props.notify(`You voted '${anec.content}'`)
    }
    
  
    const AnecdotesInOrder = (anecdotes) => {
      return anecdotes.sort((a,b) => b.votes - a.votes)
    }

    const filterAnecdotes = (anecdotes) => {
      const filter = props.filter
      if( filter === 'ALL'){
        return anecdotes
      }
      const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return filteredAnecdotes
    }

    return (
      <div>
        <Filter></Filter>
        {AnecdotesInOrder(filterAnecdotes(anecdotes)).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)