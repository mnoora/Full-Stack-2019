import React from 'react';
import { 
    createAnecdote
  } 
from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        props.store.dispatch(createAnecdote(event.target.anecdote.value))
        props.store.dispatch(notify(`You created '${event.target.anecdote.value}'`))
        event.target.anecdote.value = ''
      }
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm