import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk';

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)