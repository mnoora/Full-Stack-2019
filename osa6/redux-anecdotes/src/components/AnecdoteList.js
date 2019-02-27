import React from 'react';
import { 
    vote
  } 
from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {
    const anecdotes = props.store.getState().anecdotes
  
    const addVote = (id) => {
      props.store.dispatch(vote(id))
      const anec = anecdotes.find(n => n.id === id)
      props.store.dispatch(notify(`You voted '${anec.content}'`))
    }
    
  
    const AnecdotesInOrder = (anecdotes) => {
      return anecdotes.sort((a,b) => b.votes - a.votes)
    }

    const filterAnecdotes = (anecdotes) => {
      const filter = props.store.getState().filter
      if( filter === 'ALL'){
        return anecdotes
      }
      const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      return filteredAnecdotes
    }

    return (
      <div>
        <Filter store={props.store}></Filter>
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

export default AnecdoteList