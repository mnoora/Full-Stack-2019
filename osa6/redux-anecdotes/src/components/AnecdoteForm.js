import React from 'react';
import { 
    createAnecdote
  } 
from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import {notify} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = (event) => {
        event.preventDefault()
        props.createAnecdote(event.target.anecdote.value)
        props.notify(`You created '${event.target.anecdote.value}'`)
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

export default connect(
  null,
  { createAnecdote, notify }
)(AnecdoteForm)