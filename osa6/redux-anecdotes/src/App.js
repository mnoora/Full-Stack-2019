import React from 'react';
import AnecdoteList from './components/AnecdoteList'
import  AnecdoteForm from './components/AnecdoteForm'


const App = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store}></AnecdoteList>
      <AnecdoteForm store={props.store}></AnecdoteForm>
    </div>
  )
}

export default App
